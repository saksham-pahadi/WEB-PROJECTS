import mongoose from 'mongoose';
const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL
export default mongoose.models?.OTP || mongoose.model('OTP', OTPSchema);
