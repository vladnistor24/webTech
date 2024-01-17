// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  // Check for the presence of the 'x-auth-token' header
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. Token not found.' });
  }

  try {
    // Verify the token and add the decoded user to the request
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error('Error:', error);
    res.status(401).json({ message: 'Authorization denied. Invalid token.' });
  }
};
