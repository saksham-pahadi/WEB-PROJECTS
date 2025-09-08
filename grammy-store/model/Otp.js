import mongoose from 'mongoose';
const OTPSchema = new mongoose.Schema({
  email: String,
  otpHash: String,
  expiresAt: Date,
});
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL
export default mongoose.models?.OTP || mongoose.model('OTP', OTPSchema);
