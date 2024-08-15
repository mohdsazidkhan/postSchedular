import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  image: { type: String },
  scheduledTime: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  platforms: [{ type: String, enum: ['facebook', 'youtube', 'linkedin', 'instagram', 'twitter'] }],
  status: { type: String, default: 'scheduled' },
});

export default mongoose.models.Post || mongoose.model('Post', postSchema);
