// app/api/auth/requestOtp/route.js
import connectDB from "@/db/connectDb";
import Otp from "@/models/Otp";
import bcrypt from "bcryptjs";
import sendMail from "@/lib/mailer";
import { NextResponse } from "next/server";

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

export async function POST(req) {
  try {
    const { email, name } = await req.json();
    console.log(email);
    console.log(name);

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400 });
    }

    await connectDB();

    const otpPlain = generateOtp();
    const otpHash = await bcrypt.hash(otpPlain, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); //5 min

    await Otp.deleteMany({ email });

    console.log("Creating OTP:", { email, otpHash, expiresAt });

    await Otp.create({ email, otp:otpHash, expiresAt });

    await sendMail(email, "GMAC AUTHENTICATION", `Hi ${ name.split(" ")[0] || "User"},

Thank you for signing up with GMAC!

Your One-Time Password (OTP) is: ${otpPlain}

Please enter this code to verify your account. 
This code will expire in 5 minutes.

If you did not request this, you can safely ignore this email.

Best regards,  
GMAC Team`);
    // console.log("OTP",otpPlain);

    return new Response(JSON.stringify({ ok: true, message: "OTP sent successfully" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: `Server error: ${err.message}` }, { status: 500 });
  }
}
