const mongoose = require('mongoose');

const lookupSchema = new mongoose.Schema({
  LookupID: { type: Number, unique: true, required: true },
  LookupCode: { type: String, required: true, default: '' },
  LookupDescription: { type: String, required: true, default: '' },
  LookupDescription_TH: { type: String, default: '' },
  LookupCategory: { type: String, required: true, default: '' },
  Status: { type: Boolean, required: true, default: true },
  ISOCode: { type: String, required: true, default: '' },
  MappingCode: { type: String, required: true, default: '' },
  CreatedBy: { type: String, required: true, default: '' },
  CreatedOn: { type: Date, required: true, default: Date.now },
  ModifiedBy: { type: String, required: true, default: '' },
  ModifiedOn: { type: Date, required: true, default: Date.now }
});

const Lookup = mongoose.model('Lookup', lookupSchema);

module.exports = Lookup;
