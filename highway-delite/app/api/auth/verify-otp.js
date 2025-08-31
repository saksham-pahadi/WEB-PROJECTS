import dbConnect from '../../../lib/db';
import OTP from '../../../models/OTP';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const { email, otp } = req.body;
  await dbConnect();
  const record = await OTP.findOne({ email }).sort({ _id: -1 });
  if(!record) return res.status(400).json({ error: 'OTP expired or not found' });

  const ok = await bcrypt.compare(otp, record.otpHash);
  if(!ok) return res.status(401).json({ error: 'Invalid OTP' });

  // upsert user
  let user = await User.findOne({ email });
  if(!user) user = await User.create({ email, provider: 'email' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  // set HttpOnly cookie:
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${7*24*60*60}`);

  return res.json({ ok: true, user: { email: user.email, name: user.name } });
}
