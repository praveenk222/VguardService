const mongoose = require('mongoose');

const messageHeaderSchema = new mongoose.Schema({
  MessageID: { type: Number, unique: true },  // Equivalent to SQL's Identity field
  SenderID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to Sender (User)
  ReceiverID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to Receiver (User)
  ProductID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },  // Reference to Product
  CreatedOn: { type: Date, default: Date.now },  // Message creation date
  MessageSubject: { type: String, maxlength: 255 },  // Subject of the message
  IsPrivate: { type: Boolean, default: false },  // If the message is private
  FileName: { type: String, maxlength: 200 }  // File name associated with the message
});

const MessageHeader = mongoose.model('MessageHeader', messageHeaderSchema);

module.exports = MessageHeader;
