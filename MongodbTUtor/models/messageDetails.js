const mongoose = require('mongoose');

const messageDetailSchema = new mongoose.Schema({
  ItemID: { type: Number, unique: true },  // Similar to SQL's Identity field
  MessageID: { type: mongoose.Schema.Types.ObjectId, ref: 'MessageHeader', required: true },  // Foreign key reference to MessageHeader
  MemberID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Foreign key reference to the user (Member)
  MessageTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Foreign key reference to the recipient
  Comment: { type: String },  // Comment or message content
  CreatedOn: { type: Date, default: Date.now },  // Message creation date
  IsRead: { type: Boolean, default: false }  // Boolean flag for read/unread status
});

const MessageDetail = mongoose.model('MessageDetail', messageDetailSchema);

module.exports = MessageDetail;
