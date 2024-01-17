const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', ProductController.getAllProducts);
router.post('/', authMiddleware, ProductController.addProduct);
router.put('/:productId', authMiddleware, ProductController.updateProduct);
router.delete('/:productId', authMiddleware, ProductController.deleteProduct);

module.exports = router;
