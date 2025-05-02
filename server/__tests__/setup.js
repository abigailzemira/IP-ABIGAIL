require('dotenv').config();

const app = require('../app');
const { sequelize } = require('../models');
const { User, Book, OwnedBook, Category, CategoryHeader } = require('../models');
const { signToken } = require('../helpers/createToken');
const request = require('supertest');
const bcrypt = require('bcryptjs');

let access_token;
let validUserId;
let testCategoryHeader;
let testCategory;
let testBook;
let testOwnedBook;

beforeAll(async () => {
  try {
    // Create test user
    const testUser = await User.create({
      email: "test@mail.com",
      password: "password123",
      username: "testuser"
    });
    validUserId = testUser.id;
    access_token = signToken({
      id: testUser.id,
      email: testUser.email
    });

    // Create test category header
    testCategoryHeader = await CategoryHeader.create({
      name: "Test Header",
      imageUrl: "test-image.jpg"
    });

    // Create test category
    testCategory = await Category.create({
      name: "Test Category",
      CategoryHeaderId: testCategoryHeader.id
    });

    // Create test book
    testBook = await Book.create({
      name: "Test Book",
      synopsis: "Test synopsis",
      cover: "test-cover.jpg",
      CategoryId: testCategory.id
    });

    // Create test owned book
    testOwnedBook = await OwnedBook.create({
      BookId: testBook.id,
      UserId: validUserId,
      status: "Unread"
    });
  } catch (error) {
    console.error('Test setup failed:', error);
  }
});

afterAll(async () => {
  try {
    await OwnedBook.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await Book.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await Category.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await CategoryHeader.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await sequelize.close();
  } catch (error) {
    console.error('Test cleanup failed:', error);
  }
});

function getValidUser() {
  return validUserId;
}

function getToken() {
  return access_token;
}

function getTestCategoryHeader() {
  return testCategoryHeader;
}

function getTestCategory() {
  return testCategory;
}

function getTestBook() {
  return testBook;
}

function getTestOwnedBook() {
  return testOwnedBook;
}

module.exports = {
  request,
  app,
  access_token,
  getValidUser,
  getToken,
  getTestCategoryHeader,
  getTestCategory,
  getTestBook,
  getTestOwnedBook
};