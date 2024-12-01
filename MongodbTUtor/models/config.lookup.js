const mongoose = require('mongoose');
const Counter = require('./counter');

const lookupSchema = new mongoose.Schema({
  LookupCode: { type: String, required: true, default: '' },
  LookupDescription: { type: String, required: true, default: '' },
  LookupCategory: { type: String, required: true, default: '' },
  Status: { type: Boolean, required: true, default: true },
  CreatedBy: { type: String, required: false, default: '' },
  CreatedOn: { type: Date, required: false, default: Date.now },
  ModifiedBy: { type: String, required: false, default: '' },
  ModifiedOn: { type: Date, required: false, default: Date.now }
});



const Lookup = mongoose.model('Lookup', lookupSchema);

module.exports = Lookup;
