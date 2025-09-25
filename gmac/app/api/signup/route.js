import { NextResponse } from "next/server"
import connectDB from "@/db/connectDb"
import User from "@/models/User"
import mongoose from "mongoose"
import Otp from "@/models/Otp"
import bcrypt from "bcryptjs";

// This should ideally come from a temporary OTP store (DB/Redis/email service)
const otpStore = new Map()
// Example: otpStore.set(email, { otp: "123456", expires: Date.now() + 300000 })

export async function POST(req) {
    try {
        const body = await req.json()
        const { email, otp, fullname, dob, password } = body
        const hashpass = await bcrypt.hash(password, 10);
        // console.log(body)

        if (!email || !otp || !fullname || !dob) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 })
        }

        // ✅ Connect DB
        await connectDB()

        // ✅ Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            )
        }

        const otpEntry = await Otp.findOne({ email });
        if (!otpEntry) {
            return NextResponse.json({ error: "No OTP found, request again" }, { status: 400 });
        }
        // Check expiry
        if (otpEntry.expiresAt < new Date()) {
            await Otp.deleteOne({ _id: otpEntry._id });
            return NextResponse.json({ error: "OTP expired" }, { status: 400 });
        }

        // ✅ Compare plain vs hashed OTP
        const isValid = await bcrypt.compare(otp, otpEntry.otp);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
        }

        // ✅ Create user
        const newUser = await User.create({
            email: email.toLowerCase(),
            name: fullname,
            dob,
            password: hashpass,
            username: email.split("@")[0],
            profilepic: null,
            role: "user",
            remember: false,
            bio: null,
            links: [],
            provider: "Credentials"
        })

        // ✅ Cleanup OTP
        await Otp.deleteOne({ _id: otpEntry._id });

        return NextResponse.json(
            { message: "User created successfully", user: { id: newUser._id, email: newUser.email } },
            { status: 201 }
        )
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    } finally {
        await mongoose.disconnect()
    }
}
