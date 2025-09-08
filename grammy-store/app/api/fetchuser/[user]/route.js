// app/api/auth/requestOtp/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/model/User";

export async function GET(request) {
    try {

        const Url = request.url
        let result = true
        let getuser=[]
        const user =Url.split("/fetchuser/")[1]
        console.log("get user",user)


        await dbConnect()
         getuser = await User.find({email:user})
        console.log("got user",getuser)

        




        return new Response(JSON.stringify({ ok: result,getuser}), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
