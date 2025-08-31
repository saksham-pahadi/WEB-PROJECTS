import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  provider: { type: String, default: 'email' }, // 'google' or 'email'
  googleId: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.User || mongoose.model('User', UserSchema);
