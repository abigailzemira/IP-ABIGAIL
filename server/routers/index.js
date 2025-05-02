//routes
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller.js');
const authentication = require('../middlewares/authentication.js');

//gets all category header data along with categories
router.get('/categoryHeaders', Controller.getCategoryHeaders);

//gets all categories
router.get('/categories', Controller.getcategory);

//get category by id with books
router.get('/categories/:id/books', Controller.getCategoryById);

//login endpoint
router.post('/login', Controller.postLogin);

//login endpoint with google
router.post('/login/google', Controller.googleLogin);

//register endpoint
router.post('/register', Controller.postRegister);

//get book detail by id
router.get('/books/:id', Controller.getBookById);

//add books to owned books
router.post('/ownedBooks/:bookId', authentication, Controller.postOwnedBook);

//update owned book
router.put('/ownedBooks/:id', authentication, Controller.updateOwnedBook);

// get all owned books
router.get('/ownedBooks', authentication, Controller.getOwnedBooks);

//delete owned book
router.delete('/ownedBooks/:id', authentication, Controller.deleteOwnedBook);

//get reccommendations
router.get('/recommendations', authentication, Controller.getRecommendations);
module.exports = router;