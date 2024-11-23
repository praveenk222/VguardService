const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  StockID: { type: Number, unique: true, required: true },
  StockType: { type: Number, required: true },
  ProductID: { type: Number, required: true },
  ProductDescription: { type: String, default: '' },
  Quantity: { type: Number, required: true },
  StockStatus: { type: Number, required: true },
  FarmID: { type: Number, required: true, default: 0 }
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
