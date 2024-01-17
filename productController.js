// controllers/productController.js
const Product = require('../models/Product');

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      // Get all products from the database
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { name, category, expirationDate } = req.body;

      // Create a new product
      const newProduct = new Product({
        name,
        category,
        expirationDate,
        userId: req.user._id, // Using user information from JWT
      });

      // Save the product to the database
      await newProduct.save();

      res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { name, category, expirationDate } = req.body;
      const productId = req.params.productId;

      // Update the product in the database
      await Product.findByIdAndUpdate(productId, {
        name,
        category,
        expirationDate,
      });

      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.productId;

      // Delete the product from the database
      await Product.findByIdAndDelete(productId);

      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
