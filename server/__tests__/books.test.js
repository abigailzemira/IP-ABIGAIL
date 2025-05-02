const { request, app, getTestBook, getTestCategory, getTestOwnedBook, getToken, getValidUser, getTestCategoryHeader } = require('./setup');
const { generateBookRecommendations } = require('../helpers/genai');
const { Book } = require('../models');

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

  describe('GET /recommendations', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should get book recommendations when authenticated', async () => {
      const res = await request(app)
        .get('/recommendations')
        .set('Authorization', `Bearer ${getToken()}`);
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });

    test('should return empty array when user has no books', async () => {
      // First delete all owned books
      const ownedBook = getTestOwnedBook();
      await request(app)
        .delete(`/ownedBooks/${ownedBook.id}`)
        .set('Authorization', `Bearer ${getToken()}`);

      const res = await request(app)
        .get('/recommendations')
        .set('Authorization', `Bearer ${getToken()}`);
      
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    test('should fail without authentication', async () => {
      const res = await request(app)
        .get('/recommendations');
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Please login first');
    });

    test('should get recommendations when user has books', async () => {
      generateBookRecommendations.mockResolvedValue([
        {
          title: 'Recommended Book',
          author: 'Test Author',
          reason: 'Similar genre'
        }
      ]);

      const res = await request(app)
        .get('/recommendations')
        .set('Authorization', `Bearer ${getToken()}`);
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(generateBookRecommendations).toHaveBeenCalled();
    });

    test('should return empty array when user has no books', async () => {
      // First delete test owned book
      const testOwnedBook = getTestOwnedBook();
      await request(app)
        .delete(`/ownedBooks/${testOwnedBook.id}`)
        .set('Authorization', `Bearer ${getToken()}`);

      const res = await request(app)
        .get('/recommendations')
        .set('Authorization', `Bearer ${getToken()}`);
      
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
      expect(generateBookRecommendations).not.toHaveBeenCalled();
    });

    test('should handle AI service error', async () => {
      generateBookRecommendations.mockRejectedValue(new Error('AI service error'));

      const res = await request(app)
        .get('/recommendations')
        .set('Authorization', `Bearer ${getToken()}`);
      
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Internal Server Error');
    });

    test('should fail without authentication', async () => {
      const res = await request(app)
        .get('/recommendations');
      
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Please login first');
    });
  });

  describe('POST /books/find', () => {
    test('should find books based on query', async () => {
      const res = await request(app)
        .post('/books/find')
        .send({ query: 'Test Book' });
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('suggestion');
      expect(res.body).toHaveProperty('availableBooks');
      expect(Array.isArray(res.body.availableBooks)).toBeTruthy();
    });

    test('should fail without query', async () => {
      const res = await request(app)
        .post('/books/find')
        .send({});
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Query is required');
    });
  });

  describe('Book Model', () => {
    test('should set default synopsis when not provided', async () => {
      const category = getTestCategory();
      const bookData = {
        name: 'Book without Synopsis',
        cover: 'test-cover.jpg',
        CategoryId: category.id
      };

      const book = await Book.create(bookData);
      expect(book.synopsis).toBe('No synopsis available');
    });

    test('should set default synopsis when synopsis is null', async () => {
      const category = getTestCategory();
      const bookData = {
        name: 'Book with Null Synopsis',
        synopsis: null,
        cover: 'test-cover.jpg',
        CategoryId: category.id
      };

      const book = await Book.create(bookData);
      expect(book.synopsis).toBe('No synopsis available');
    });

    test('should not override existing synopsis', async () => {
      const category = getTestCategory();
      const synopsis = 'Custom synopsis';
      const bookData = {
        name: 'Book with Synopsis',
        synopsis,
        cover: 'test-cover.jpg',
        CategoryId: category.id
      };

      const book = await Book.create(bookData);
      expect(book.synopsis).toBe(synopsis);
    });

    test('should validate required fields', async () => {
      try {
        await Book.create({});
        fail('Should not create book without required fields');
      } catch (error) {
        expect(error.name).toBe('SequelizeValidationError');
      }
    });
  });
});