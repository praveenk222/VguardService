const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  WishlistID: { type: Number, unique: true },  // Identity field in SQL, generated manually or by a sequence
  CustomerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  ProductID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  isActive: { type: Boolean, default: true }   // Defaults to true if not specified
});

// This ensures uniqueness of each customer-product wishlist entry
wishlistSchema.index({ CustomerID: 1, ProductID: 1 }, { unique: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
