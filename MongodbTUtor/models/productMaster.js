const mongoose = require('mongoose');

const productMasterSchema = new mongoose.Schema({
  ProductID: { type: Number, required: true, unique: true },
  BranchID: { type: Number, required: true },
  ProductName: { type: String, maxlength: 150 },
  RegistrationNo: { type: String, maxlength: 50 },
  RegistrationDate: { type: Date },
  Model: { type: String, maxlength: 200 },
  Category: { type: Number },
  Quntity: { type: Number },
  Brand: { type: String, maxlength: 50 },
  Size: { type: String, maxlength: 100 },
  Color: { type: String, maxlength: 50 },
  ImageName: { type: String, maxlength: 150 },
  ImageID: { type: Number, required: true },
  IsActive: { type: Boolean, required: true },
  IsAvailable: { type: Boolean },
  CreatedOn: { type: Date, default: Date.now },
  ModifiedOn: { type: Date },
  EstablishedDate: { type: Date },
  Condition: { type: Number },
  LastServiceDate: { type: Date },
  VehicleModel: { type: Number },
  Price: { type: Number },
  ProductType: { type: Number }
});

const ProductMaster = mongoose.model('ProductMaster', productMasterSchema);

module.exports = ProductMaster;
