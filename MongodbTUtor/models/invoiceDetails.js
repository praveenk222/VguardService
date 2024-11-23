const mongoose = require('mongoose');

const invoiceDetailSchema = new mongoose.Schema({
  ItemID: { type: Number, unique: true, required: true },
  InvoiceID: { type: Number, required: true },
  ProductID: { type: Number, default: null },
  Quantity: { type: Number, default: 0 },
  UnitPrice: { type: mongoose.Types.Decimal128, default: 0.00 },
  DiscountType: { type: Number, default: null },
  DiscountAmount: { type: mongoose.Types.Decimal128, default: 0.00 },
  TaxAmount: { type: mongoose.Types.Decimal128, default: 0.00 },
  SellingAmount: { type: mongoose.Types.Decimal128, default: 0.00 }
});

const InvoiceDetail = mongoose.model('InvoiceDetail', invoiceDetailSchema);

module.exports = InvoiceDetail;
