const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth.Middleware'); // Correct import
const { User } = require('../models');

// Auth routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Get current user info
router.get('/me', authenticate, async (req, res) => {
  try {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    });
  } catch (error) {
    console.error("GET /me error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
