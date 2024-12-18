const express = require('express');
const admin_router = express.Router();
const adminController = require('../controllers/adminController');

admin_router.get('/admin', adminController.getSignup);

module.exports = admin_router;