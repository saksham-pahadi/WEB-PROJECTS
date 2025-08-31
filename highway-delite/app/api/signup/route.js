// app/api/auth/requestOtp/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/model/User";

export async function POST(req) {
    try {
        const form = await req.json();
        console.log(form);
        const email = form.email;
        console.log(form.dob)
        console.log(form.fullname)
        console.log(typeof (form.dob))



        await dbConnect();

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            console.log(existingUser)
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const newUser = await User.create({
            fullname: form.fullname,             
            email: form.email,
            dob: form.dob,    
            remember: form.remember
        });







        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
