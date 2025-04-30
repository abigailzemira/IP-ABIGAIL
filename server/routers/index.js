//routes
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller.js');
const authentication = require('../middlewares/authentication.js');

//get all books
router.get('/', Controller.getBook);

//gets all category header data along with categories
router.get('/categoryHeaders', Controller.getCategoryHeaders);

//gets all categories
router.get('/categories', Controller.getcategory);

//get category by id with books
router.get('/categories/:id/books', Controller.getCategoryById);

//login endpoint
router.post('/login', Controller.postLogin);

//register endpoint
router.post('/register', Controller.postRegister);

//get book detail by id
router.get('/books/:id', Controller.getBookById);

//add books to owned books
router.post('/books/:bookId', authentication, Controller.postOwnedBook);
module.exports = router;