const express = require('express');
const user_router = express.Router();
const userController = require('../controllers/userController');
const { isLogin } = require('../middlewares/auth');


// Getting Pages
user_router.get('/', userController.getHome);
user_router.get('/signup', userController.getSignup);
user_router.get('/login', userController.getLogin);



module.exports = user_router;