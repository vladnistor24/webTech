const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  expirationDate: { type: Date },
  isAvailable: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Add other fields as needed
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
