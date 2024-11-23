const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
  OrderDetailsID: { type: Number, unique: true },  // Equivalent to SQL's Identity field
  OrderID: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },  // Reference to the Order
  ProductID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },  // Reference to the Product
  UnitPrice: { type: mongoose.Schema.Types.Decimal128 },  // Price of the product
  Quantity: { type: Number },  // Quantity of the product
  Discount: { type: mongoose.Schema.Types.Decimal128 },  // Discount applied
  TotalAmount: { type: mongoose.Schema.Types.Decimal128 },  // Total amount after discount
  OrderDate: { type: Date }  // Date when the order was placed
});

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;
