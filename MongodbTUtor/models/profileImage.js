const mongoose = require('mongoose');

const profileImageSchema = new mongoose.Schema({
  ImageID: { type: Number, unique: true },  // Equivalent to SQL's Identity field
  ImageName: { type: String, maxlength: 100 },  // Name of the image
  MemberID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the member (User)
  IsActive: { type: Boolean },  // Boolean flag indicating if the image is active
  IsBannerImage: { type: Boolean },  // Boolean flag indicating if the image is a banner image
  CreatedOn: { type: Date, default: Date.now }  // Image creation date
});

const ProfileImage = mongoose.model('ProfileImage', profileImageSchema);

module.exports = ProfileImage;
