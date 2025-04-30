const { request, app } = require('./setup');
const { User } = require('../models');

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
});