const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  CartID: { type: Number, unique: true },  // Equivalent to SQL's Identity field
  ProductID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },  // Foreign key reference to Product
  SellerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },    // Foreign key reference to Seller
  MemberID: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },    // Foreign key reference to Member
  Quantity: { type: Number },  // Quantity of product
  UnitPrice: { type: mongoose.Decimal128 },  // Unit price of product
  Currency: { type: String, maxlength: 3 },  // 3-character currency code (e.g., USD, EUR)
  DiscountAmount: { type: mongoose.Decimal128 },  // Discount amount
  DiscountType: { type: Number },  // Discount type (smallint in SQL)
  TotalAmount: { type: mongoose.Decimal128 },  // Total amount after discount
  IsGuest: { type: Boolean, default: false },  // Is the cart for a guest user
  CreatedOn: { type: Date, default: Date.now }  // Date the cart was created
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
