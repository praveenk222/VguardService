const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  AddressID: { type: Number, required: true, unique: true },
  LinkID: { type: Number, required: true },
  AddressType: { type: Number, required: true },
  HouseNo: { type: String, maxlength: 50 },
  Address1: { type: String, required: true, maxlength: 150 },
  Address2: { type: String, maxlength: 150 },
  Landmark: { type: String, maxlength: 100 },
  City: { type: String, maxlength: 100 },
  ZipCode: { type: String, required: true, maxlength: 10 },
  AlternateNo: { type: String, maxlength: 20 },
  State: { type: String, maxlength: 50 },
  Country: { type: String, maxlength: 2 },
  Latitude: { type: Number, min: -90, max: 90 },    // decimal(12, 9)
  Longitude: { type: Number, min: -180, max: 180 }, // decimal(12, 9)
  IsDefault: { type: Boolean, required: true },
  IsActive: { type: Boolean, required: true },
  CreatedOn: { type: Date, default: Date.now },
  ModifiedOn: { type: Date },
  LocationID: { type: String, maxlength: 100 }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
