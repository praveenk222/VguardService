const mongoose = require('mongoose');

const productMasterSchema = new mongoose.Schema({
  MemberID: { type:  mongoose.Schema.Types.ObjectId,  },
  ProductName: { type: String, maxlength: 150 },
  VehicleRegistrationNo: { type: String, maxlength: 50,required: true },
  BatterySerialNo: { type: String, maxlength: 50 , required: true,},
  PurchaseDate: { type: Date, required: true, },
  ExpiryDate: { type: Date, required: true, },
  Model: { type: String, maxlength: 200 },
  Category: { type: Number },
  Quntity   : { type: Number },
  Brand: { type: String, maxlength: 50 },
  Size: { type: String, maxlength: 100 },
  IsActive: { type: Boolean, required: true },
  CreatedOn: { type: Date, default: Date.now },
  ModifiedOn: { type: Date },
  LastServiceDate: { type: Date },
  VehicleType: { type: Number },
  ProductType: { type: Number }
});

const BatteryProduct = mongoose.model('BatteryProduct', productMasterSchema);

module.exports = BatteryProduct;
