// app/api/auth/requestOtp/route.js
import connectDB from "@/db/connectDb";
import Otp from "@/models/Otp";
import bcrypt from "bcryptjs";
import sendMail from "@/lib/mailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    console.log(email);

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400 });
    }

    await connectDB();

    const otpPlain = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otpPlain, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.create({ email, otpHash, expiresAt });

    await sendMail(email, "Your OTP", `Your code is ${otpPlain} — expires in 5 min`);

    return new Response(JSON.stringify({ ok: true,otp:otpPlain }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
