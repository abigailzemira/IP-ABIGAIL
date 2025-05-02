const { request, app, getToken } = require('./setup');
const { verifyToken } = require('../helpers/createToken');

jest.mock('../helpers/createToken');

describe('Middleware Tests', () => {
  describe('Error Handler', () => {
    test('handles BadRequest error', async () => {
      const res = await request(app)
        .post('/register')
        .send({});
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Email and password are required');
    });

    test('handles Unauthorized error', async () => {
      const res = await request(app)
        .get('/ownedBooks')
        .set('Authorization', 'Bearer invalid_token');
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid token');
    });

    test('handles NotFound error', async () => {
      const res = await request(app)
        .get('/books/999999');
      
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Book not found');
    });

    test('handles SequelizeValidationError', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          email: 'invalid-email',
          password: 'password123',
          username: 'testuser'
        });
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Email must be a valid email address');
    });

    test('handles SequelizeUniqueConstraintError', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          email: 'test@mail.com',
          password: 'password123',
          username: 'testuser'
        });
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Email already in use');
    });
  });

  describe('Authentication Middleware', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should pass with valid token', async () => {
      const token = getToken();
      const res = await request(app)
        .get('/ownedBooks')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
    });

    test('should fail with missing token', async () => {
      const res = await request(app)
        .get('/ownedBooks');
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Please login first');
    });

    test('should fail with malformed token', async () => {
      const res = await request(app)
        .get('/ownedBooks')
        .set('Authorization', 'not-a-valid-token');
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid token');
    });

    test('should fail when verify token throws error', async () => {
      verifyToken.mockImplementationOnce(() => {
        throw new Error('Token verification failed');
      });

      const res = await request(app)
        .get('/ownedBooks')
        .set('Authorization', 'Bearer invalid-token');
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid token');
    });
  });
});