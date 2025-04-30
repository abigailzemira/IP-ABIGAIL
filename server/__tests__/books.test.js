const { request, app, getTestBook, getTestCategory, getTestOwnedBook, getToken, getValidUser, getTestCategoryHeader } = require('./setup');

describe('Books and Categories Tests', () => {
  describe('GET /categoryHeaders', () => {
    test('should get all category headers with their categories', async () => {
      const res = await request(app)
        .get('/categoryHeaders');
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body[0]).toHaveProperty('Categories');
      expect(res.body[0].Categories[0]).toHaveProperty('name');
    });
  });

  describe('GET /categories', () => {
    test('should get all categories', async () => {
      const res = await request(app)
        .get('/categories');
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body[0]).toHaveProperty('name');
    });
  });

  describe('GET /categories/:id/books', () => {
    test('should get category by id with its books', async () => {
      const category = getTestCategory()
      const res = await request(app)
        .get(`/categories/${category.id}/books`);
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('Books');
      expect(res.body.Books[0]).toHaveProperty('name');
      expect(res.body.Books[0]).toHaveProperty('synopsis');
      expect(res.body.Books[0]).toHaveProperty('cover');
    });

    test('should fail with invalid category id', async () => {
      const res = await request(app)
        .get('/categories/999999/books');
      
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Category not found');
    });
  });

  describe('GET /books/:id', () => {
    test('should get book by id with its category', async () => {
      const books = getTestBook()
      const res = await request(app)
        .get(`/books/${books.id}`);
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', books.id);
      expect(res.body).toHaveProperty('name', books.name);
      expect(res.body).toHaveProperty('Category');
      expect(res.body.Category).toHaveProperty('name');
    });

    test('should fail with invalid book id', async () => {
      const res = await request(app)
        .get('/books/999999');
      
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Book not found');
    });
  });

  describe('Error handling', () => {
    test('should handle internal server error', async () => {
      // Force an error by passing invalid data type
      const res = await request(app)
        .get('/books/invalid_id');
      
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Internal Server Error');
    });
  });
});