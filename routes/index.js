// routes/index.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Product = require('../models/Product');

// Public route (accessible without authentication)
router.post('/users/register', require('../controllers/userController').register);
router.post('/users/login', require('../controllers/userController').login);

// Protected route (requires authentication)
router.get('/products', authMiddleware, async (req, res) => {
  try {
    // Fetch and send products as a response
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
