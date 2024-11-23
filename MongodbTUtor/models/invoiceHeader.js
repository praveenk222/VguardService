const mongoose = require('mongoose');

const invoiceHeaderSchema = new mongoose.Schema({
  InvoiceID: { type: Number, unique: true, required: true },
  InvoiceNo: { type: String, default: '' },
  InvoiceDate: { type: Date, default: Date.now },
  OrderID: { type: Number, default: null },
  MemberID: { type: Number, default: null },
  SellerID: { type: Number, default: null },
  InvoiceAmount: { type: mongoose.Types.Decimal128, default: 0.00 },
  TaxAmount: { type: mongoose.Types.Decimal128, default: 0.00 },
  TotalAmount: { type: mongoose.Types.Decimal128, default: 0.00 },
  CreatedOn: { type: Date, default: Date.now }
});

const InvoiceHeader = mongoose.model('InvoiceHeader', invoiceHeaderSchema);

module.exports = InvoiceHeader;
