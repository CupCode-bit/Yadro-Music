const express = require('express');
const user_router = express.Router();
const userController = require('../controllers/userController');
const { isLogin } = require('../middlewares/auth');
require('dotenv').config();

// Getting Pages
user_router.get('/', userController.getHome);
user_router.get('/signup', userController.getSignup);
user_router.get('/login', userController.getLogin);
user_router.get('/search', userController.searchSong);

module.exports = user_router;