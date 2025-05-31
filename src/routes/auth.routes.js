const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);    // ✅ login is a function
router.post('/register', authController.register); // ✅ register is a function

module.exports = router;
