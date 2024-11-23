const mongoose = require('mongoose');

const memberKYCSchema = new mongoose.Schema({
  UserID: { type: Number, required: true, unique: true },
  AadharNo: { type: String, maxlength: 12 },
  PAN: { type: String, maxlength: 10 },
  DR: { type: String, maxlength: 25 },
  AadharImage: { type: String, maxlength: 2000 },
  PANImage: { type: String, maxlength: 2000 },
  DRImage: { type: String, maxlength: 2000 },
  BankName: { type: String, maxlength: 100 },
  BankAccountNo: { type: String, maxlength: 50 },
  IFSC: { type: String, maxlength: 15 },
  BankAccountType: { type: Number }, // Assuming it's a small integer in SQL
  IsActive: { type: Boolean, default: true }
});

const MemberKYC = mongoose.model('MemberKYC', memberKYCSchema);

module.exports = MemberKYC;
