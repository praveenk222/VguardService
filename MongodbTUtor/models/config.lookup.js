const mongoose = require('mongoose');
const Counter = require('./counter');

const lookupSchema = new mongoose.Schema({
  LookupID: { type: Number, unique: false, required: false,default:0 },
  LookupCode: { type: String, required: true, default: '' },
  LookupDescription: { type: String, required: true, default: '' },
  LookupDescription_TH: { type: String, required: false, default: '' },
  LookupCategory: { type: String, required: true, default: '' },
  Status: { type: Boolean, required: true, default: true },
  ISOCode: { type: String, required: false, default: '' },
  MappingCode: { type: String, required: false, default: '' },
  CreatedBy: { type: String, required: false, default: '' },
  CreatedOn: { type: Date, required: false, default: Date.now },
  ModifiedBy: { type: String, required: false, default: '' },
  ModifiedOn: { type: Date, required: false, default: Date.now }
});

// Auto-increment `LookupID` before saving
lookupSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: 'LookupID' }, // Use a unique identifier for the counter
      { $inc: { seq: 1 } }, // Increment the sequence
      { new: true, upsert: true } // Create a new counter if it doesn't exist
    );
    this.LookupID = counter.seq; // Assign the incremented value
  }
  next();
});

const Lookup = mongoose.model('Lookup', lookupSchema);

module.exports = Lookup;
