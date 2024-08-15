import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  socialMedia: {
    facebook: { type: String },
    youtube: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
    twitter: { type: String },
  },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
