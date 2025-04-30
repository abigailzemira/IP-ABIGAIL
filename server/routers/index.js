//routes
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller.js');

router.get('/', Controller.getBook);

//gets all category header data along with categories
router.get('/categoryHeaders', Controller.getCategoryHeaders);

//gets all categories data along with books
router.get('/categories', Controller.getcategory);

//login endpoint
router.post('/login', Controller.postLogin);

//register endpoint
router.post('/register', Controller.postRegister);

//get book detail by id
router.get('/books/:id', Controller.getBookById);

//add books to owned books
router.post('/books/:id', Controller.postOwnedBook);
module.exports = router;