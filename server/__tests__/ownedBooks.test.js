const { request, app, access_token,  getToken, getTestBook, getTestCategory, getTestOwnedBook, getValidUser, getTestCategoryHeader } = require('./setup');
const { Book, OwnedBook } = require('../models');
const { get } = require('../routers');

describe('OwnedBooks Tests', () => {
  describe('GET /ownedBooks', () => {
    test('should get all owned books with valid token', async () => {
      console.log(getToken(),"<<<<<< access token disini yah")
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
  });

  describe('PUT /ownedBooks/:id', () => {
    test('should update owned book status', async () => {
      const testOwnedBook = getTestOwnedBook();
      const res = await request(app)
        .put(`/ownedBooks/${testOwnedBook.id}`)
        .set('Authorization', `Bearer ${getToken()}`)
        .send({
          status: 'finished'
        });
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status', 'finished');
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
        .set('Authorization', `Bearer ${getToken()}`) // Updated to use getToken()  
        .send({
          status: 'finished'
        });
      
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Owned book not found');
    });
  });

  describe('DELETE /ownedBooks/:id', () => {
    test('should delete owned book', async () => {
      const testOwnedBook = getTestOwnedBook();
      const res = await request(app)
        .delete(`/ownedBooks/${testOwnedBook.id}`)
        .set('Authorization', `Bearer ${getToken()}`); // Updated to use getToken()
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Book removed successfully');
    });

    test('should fail with invalid owned book id', async () => {
      const res = await request(app)
        .delete('/ownedBooks/99999999')
        .set('Authorization', `Bearer ${getToken()}`); // Updated to use getToken()
      
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Owned book not found');
    });

    test('should fail without authentication', async () => {
      const testOwnedBook = getTestOwnedBook();
      const res = await request(app)
        .delete(`/ownedBooks/${testOwnedBook.id}`)
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Please login first');
    });
  });
});