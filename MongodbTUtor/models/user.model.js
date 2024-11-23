const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  UserID: { type: Number, required: true },
  EmailID: { type: String, required: true },
  MobileNo: { type: String, required: true },
  Password: { type: String, required: true },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  MemberType: { type: String, required: true },
  OTP: { type: String, required: false },
  IsOTPSent: { type: Boolean, default: false },
  OTPSentDate: { type: Date, required: false },
  IsResendOTP: { type: Boolean, default: false },
  IsOTPVerified: { type: Boolean, default: false },
  IsEmailVerified: { type: Boolean, default: false },
  IsActive: { type: Boolean, default: true },
  CreatedOn: { type: Date, default: Date.now },
  ProfilePhoto: { type: String, required: false },
  Token: { type: String, required: false },
  ParentID: { type: String, required: false },
  IsRegisteredByMobile: { type: Boolean, default: false }
});

module.exports = mongoose.model('Member', memberSchema);
