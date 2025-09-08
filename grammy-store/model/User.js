import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, unique: true },
  provider: { type: String, default: "email" },
  googleId: String,
  address: String,
  orders:String,
  cart:String,
  dob: String,                   // added
  remember: Boolean,            // added
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models?.User || mongoose.model('User', UserSchema);
