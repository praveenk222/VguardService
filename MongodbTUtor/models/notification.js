const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  NotificationID: { type: Number, unique: true },  // Equivalent to SQL's Identity field
  MemberID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the user (Member)
  SenderID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the sender (User)
  Message: { type: String, maxlength: 500 },  // Notification message
  IsRead: { type: Boolean, default: false },  // Boolean flag for read/unread status
  CreatedOn: { type: Date, default: Date.now }  // Notification creation date
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
