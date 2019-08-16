const express = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');
const UserController = require('./controllers/UserController');
const ReviewController = require('./controllers/ReviewController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/users', UserController.listUsers);
routes.post('/users', upload.single('avatar'), UserController.createUser);

routes.post('/users/books', upload.none(), UserController.addBook);

routes.get('/reviews', ReviewController.listReviews);
routes.post('/reviews', upload.none(), ReviewController.postReview);

module.exports = routes;