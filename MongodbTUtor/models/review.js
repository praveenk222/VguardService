const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  ReviewID: { type: Number, unique: true },   // Equivalent to SQL's Identity field
  CustomerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },  // Foreign key reference to Customers
  ProductID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },    // Foreign key reference to Products
  Name: { type: String },    // Name of the reviewer
  Email: { type: String },   // Email of the reviewer
  Review1: { type: String }, // Review content
  Rate: { type: Number },    // Rating (int)
  DateTime: { type: Date, default: Date.now }, // Review date
  isDelete: { type: Boolean, default: false }  // Mark for deletion
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
