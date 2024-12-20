const mongoose = require('mongoose');
 const Members = require('../models/user.model');
 const Products = require('../models/productMaster');
const notificationSchema = new mongoose.Schema({
  MemberID: { type: mongoose.Schema.Types.ObjectId, ref: 'Members' },  // Reference to the user (Member)
  BatteryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },  // Reference to the user (Member)
  Message: { type: String, maxlength: 500 },  // Notification message
  IsRead: { type: Boolean, default: false },  // Boolean flag for read/unread status
  IsActive: { type: Boolean, default: true },  // Boolean flag for read/unread status
  CreatedOn: { type: Date, default: Date.now }  // Notification creation date
});

const Notification = mongoose.model('Notifications', notificationSchema);

module.exports = Notification;
