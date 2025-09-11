import { NextResponse } from "next/server"
import connectDB from "@/db/connectDb"
import User from "@/models/User"
import mongoose from "mongoose"

// This should ideally come from a temporary OTP store (DB/Redis/email service)
const otpStore = new Map()
// Example: otpStore.set(email, { otp: "123456", expires: Date.now() + 300000 })

export async function POST(req) {
    try {
        const body = await req.json()
        const { email, otp, fullname, dob } = body

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

        // ✅ Verify OTP
        const otpEntry = otpStore.get(email)
        if (!otpEntry || otpEntry.otp !== otp || otpEntry.expires < Date.now()) {
            return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
        }

        // ✅ Create user
        const newUser = await User.create({
            email: email.toLowerCase(),
            name: fullname,
            dob,
            username: email.split("@")[0],
            role: "user",
        })

        // ✅ Cleanup OTP
        otpStore.delete(email)

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
