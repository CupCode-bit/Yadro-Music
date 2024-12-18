const express = require('express');
const user_router = express.Router();
const userController = require('../controllers/userController');

user_router.get('/', userController.getSignup);

module.exports = user_router;