const { request, app } = require('./setup');
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');

jest.mock('google-auth-library');

describe('Authentication Tests', () => {
  describe('POST /register', () => {
    test('should successfully register a new user', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          email: 'new@mail.com',
          password: 'password123',
          username: 'newuser'
        });
      
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('email', 'new@mail.com');
      expect(res.body).toHaveProperty('username', 'newuser');
    });

    test('should fail when email is missing', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          password: 'password123',
          username: 'testuser'
        });
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Email and password are required');
    });

    test('should fail when password is missing', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          email: 'test@mail.com',
          username: 'testuser'
        });
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Email and password are required');
    });

    test('should fail when email is already registered', async () => {
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

    test('should fail with invalid email format', async () => {
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

    test('should handle database error during registration', async () => {
      // Mock User.create to throw an error
      jest.spyOn(User, 'create').mockRejectedValueOnce(new Error('Database error'));

      const res = await request(app)
        .post('/register')
        .send({
          email: 'test@error.com',
          password: 'password123',
          username: 'erroruser'
        });
      
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Internal Server Error');
    });

    test('should handle unique email constraint', async () => {
      // First register a user
      await request(app)
        .post('/register')
        .send({
          email: 'unique@test.com',
          password: 'password123',
          username: 'uniqueuser'
        });

      // Try to register with same email
      const res = await request(app)
        .post('/register')
        .send({
          email: 'unique@test.com',
          password: 'password123',
          username: 'uniqueuser2'
        });
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Email already in use');
    });
  });

  describe('POST /login', () => {
    test('should successfully login with correct credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'test@mail.com',
          password: 'password123'
        });
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('access_token');
    });

    test('should fail with incorrect password', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'test@mail.com',
          password: 'wrongpassword'
        });
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid email/password');
    });

    test('should fail with non-existent email', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'nonexistent@mail.com',
          password: 'password123'
        });
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid email/password');
    });

    test('should fail when email is missing', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          password: 'password123'
        });
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Email and password are required');
    });

    test('should fail when password is missing', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'test@mail.com'
        });
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Email and password are required');
    });
  });

  describe('POST /login/google', () => {
    const mockGoogleToken = 'valid-google-token';
    const mockPayload = {
      email: 'google@test.com',
      name: 'Google User'
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should successfully login with google', async () => {
      // Mock verify token
      OAuth2Client.prototype.verifyIdToken = jest.fn().mockResolvedValue({
        getPayload: () => mockPayload
      });

      const res = await request(app)
        .post('/login/google')
        .send({ googleToken: mockGoogleToken });
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('access_token');
    });

    test('should fail when google token is missing', async () => {
      const res = await request(app)
        .post('/login/google')
        .send({});
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Google Token is required');
    });

    test('should fail with invalid google token', async () => {
      // Mock verify token failure
      OAuth2Client.prototype.verifyIdToken = jest.fn().mockRejectedValue(
        new Error('Invalid token')
      );

      const res = await request(app)
        .post('/login/google')
        .send({ googleToken: 'invalid-token' });
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid token');
    });

    test('should create new user if email not found', async () => {
      // Mock verify token
      OAuth2Client.prototype.verifyIdToken = jest.fn().mockResolvedValue({
        getPayload: () => ({
          email: 'newgoogle@test.com',
          name: 'New Google User'
        })
      });

      const res = await request(app)
        .post('/login/google')
        .send({ googleToken: mockGoogleToken });
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('access_token');

      // Verify user was created
      const user = await User.findOne({
        where: { email: 'newgoogle@test.com' }
      });
      expect(user).toBeTruthy();
      expect(user.username).toBe('New Google User');
    });
  });
});