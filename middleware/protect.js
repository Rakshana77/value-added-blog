const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// Middleware function to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check if the token is present in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using JWT_SECRET (from .env or config)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by decoded ID and attach the user to the request object
      req.user = await User.findById(decoded.id);

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If token is not provided
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
