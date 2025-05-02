const { request, app, access_token, getToken, getTestBook, getTestCategory, getTestOwnedBook, getValidUser, getTestCategoryHeader } = require('./setup');
const { Book, OwnedBook } = require('../models');
const { get } = require('../routers');
const { generateBookRecommendations } = require('../helpers/genai');

// Mock the genai helper
jest.mock('../helpers/genai');

describe('OwnedBooks Tests', () => {
  describe('GET /ownedBooks', () => {
    test('should get all owned books with valid token', async () => {
      const res = await request(app)
        .get('/ownedBooks')
        .set('Authorization', `Bearer ${getToken()}`);
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body[0]).toHaveProperty('Book');
    });

    test('should fail without token', async () => {
      const res = await request(app)
        .get('/ownedBooks');
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Please login first');
    });

    test('should fail with invalid token', async () => {
      const res = await request(app)
        .get('/ownedBooks')
        .set('Authorization', 'Bearer invalid_token');
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid token');
    });

    test('should fail with wrong token format', async () => {
      const res = await request(app)
        .get('/ownedBooks')
        .set('Authorization', 'Wrong ${access_token}');
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid token');
    });
  });

  describe('POST /ownedBooks/:bookId', () => {
    test('should add a book to owned books', async () => {
      const testBook = getTestBook();
      const res = await request(app)
        .post(`/ownedBooks/${testBook.id}`)
        .set('Authorization', `Bearer ${getToken()}`);
      
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('BookId', testBook.id);
      expect(res.body).toHaveProperty('UserId', getValidUser());
    });

    test('should fail with invalid book id', async () => {
      const res = await request(app)
        .post('/ownedBooks/99999999')
        .set('Authorization', `Bearer ${getToken()}`);
      
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Book not found');
    });

    test('should fail without authentication', async () => {
      const res = await request(app)
        .post(`/ownedBooks/${getValidUser()}`);
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Please login first');
    });

    test('should fail when adding same book twice', async () => {
      const testBook = getTestBook();
      await request(app)
        .post(`/ownedBooks/${testBook.id}`)
        .set('Authorization', `Bearer ${getToken()}`);

      const res = await request(app)
        .post(`/ownedBooks/${testBook.id}`)
        .set('Authorization', `Bearer ${getToken()}`);
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Book already in collection');
    });
  });

  describe('PUT /ownedBooks/:id', () => {
    test('should update owned book status', async () => {
      const testOwnedBook = getTestOwnedBook();
      const res = await request(app)
        .put(`/ownedBooks/${testOwnedBook.id}`)
        .set('Authorization', `Bearer ${getToken()}`)
        .send({
          status: 'Reading'
        });
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status', 'Reading');
    });

    test('should fail without status', async () => {
      const testOwnedBook = getTestOwnedBook();
      const res = await request(app)
        .put(`/ownedBooks/${testOwnedBook.id}`)
        .set('Authorization', `Bearer ${getToken()}`)
        .send({});
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Status is required');
    });

    test('should fail with invalid owned book id', async () => {
      const res = await request(app)
        .put('/ownedBooks/999999')
        .set('Authorization', `Bearer ${getToken()}`)
        .send({
          status: 'Reading'
        });
      
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Owned book not found');
    });

    test('should fail when updating book owned by another user', async () => {
      const testOwnedBook = getTestOwnedBook();
      const res = await request(app)
        .put(`/ownedBooks/${testOwnedBook.id}`)
        .set('Authorization', 'Bearer different_user_token')
        .send({
          status: 'Reading'
        });
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid token');
    });

    test('should handle database error during update', async () => {
      // Mock update to throw error
      jest.spyOn(OwnedBook, 'update').mockRejectedValueOnce(new Error('Database error'));
      
      const testOwnedBook = getTestOwnedBook();
      const res = await request(app)
        .put(`/ownedBooks/${testOwnedBook.id}`)
        .set('Authorization', `Bearer ${getToken()}`)
        .send({ status: 'Reading' });
      
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Internal Server Error');
    });

    test('should handle database error during findByPk after update', async () => {
      const testOwnedBook = getTestOwnedBook();
      
      // Mock findByPk to return null after update
      const originalFindByPk = OwnedBook.findByPk;
      OwnedBook.findByPk = jest.fn()
        .mockResolvedValueOnce(testOwnedBook)  // First call in updateOwnedBook
        .mockResolvedValueOnce(null);          // Second call after update
      
      const res = await request(app)
        .put(`/ownedBooks/${testOwnedBook.id}`)
        .set('Authorization', `Bearer ${getToken()}`)
        .send({ status: 'Reading' });
      
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Owned book not found');
      
      // Restore original findByPk
      OwnedBook.findByPk = originalFindByPk;
    });
  });

  describe('DELETE /ownedBooks/:id', () => {
    test('should delete owned book', async () => {
      const testOwnedBook = getTestOwnedBook();
      const res = await request(app)
        .delete(`/ownedBooks/${testOwnedBook.id}`)
        .set('Authorization', `Bearer ${getToken()}`);
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Book removed successfully');
    });

    test('should fail with invalid owned book id', async () => {
      const res = await request(app)
        .delete('/ownedBooks/99999999')
        .set('Authorization', `Bearer ${getToken()}`);
      
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Owned book not found');
    });

    test('should fail without authentication', async () => {
      const testOwnedBook = getTestOwnedBook();
      const res = await request(app)
        .delete(`/ownedBooks/${testOwnedBook.id}`);
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Please login first');
    });

    test('should fail when deleting book owned by another user', async () => {
      const testOwnedBook = getTestOwnedBook();
      const res = await request(app)
        .delete(`/ownedBooks/${testOwnedBook.id}`)
        .set('Authorization', 'Bearer different_user_token');
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid token');
    });
  });

  describe('GET /recommendations', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should handle AI service error', async () => {
      generateBookRecommendations.mockRejectedValueOnce(new Error('AI service error'));

      const res = await request(app)
        .get('/recommendations')
        .set('Authorization', `Bearer ${getToken()}`);
      
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Internal Server Error');
    });

    test('should handle database error during owned books fetch', async () => {
      // Mock findAll to throw error
      jest.spyOn(OwnedBook, 'findAll').mockRejectedValueOnce(new Error('Database error'));

      const res = await request(app)
        .get('/recommendations')
        .set('Authorization', `Bearer ${getToken()}`);
      
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Internal Server Error');
    });
  });
});