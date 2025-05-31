const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware to authenticate user via JWT
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findByPk(decoded.id); // Make sure you're using `id`, not `userId`

    if (!user) return res.status(401).json({ message: 'Invalid user' });

    req.user = user; // Attach full user instance
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check if user is admin
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins are allowed' });
  }
  next();
};

module.exports = {
  authenticate,
  authorizeAdmin
};
