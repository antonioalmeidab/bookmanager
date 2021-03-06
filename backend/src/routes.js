const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const uploadConfig = require('./config/upload');
const UserController = require('./controllers/UserController');
const ReviewController = require('./controllers/ReviewController');
const booksAPI = require('./services/booksAPI');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/users', UserController.listUsers);
routes.post('/users', upload.single('avatar'), UserController.createUser);
routes.get('/users/:userId', UserController.getSpecificUser);

routes.post('/users/:userId/books/:bookId', UserController.addBook);
routes.put('/users/:userId/books', bodyParser.json(), UserController.updateBooks);

routes.get('/reviews', ReviewController.listReviews);
routes.post('/reviews', upload.none(), ReviewController.postReview);

routes.get('/books/:q', booksAPI.searchBooks);
routes.get('/books/:bookId/usersReading', UserController.getUsersReading);
routes.post('/user/myBooks', bodyParser.json(), booksAPI.getUserBooks);

module.exports = routes;