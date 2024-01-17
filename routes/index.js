const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Product = require('../models/Product');

router.post('/users/register', require('../controllers/userController').register);
router.post('/users/login', require('../controllers/userController').login);

router.get('/products', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
