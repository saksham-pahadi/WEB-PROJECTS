// app/api/auth/requestOtp/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Note from "@/model/Note";

export async function GET(request) {
    try {

        const Url = request.url
        const user =Url.split("/getnotes/")[1]
        console.log("get notes",user)


        await dbConnect()
        const Notes = await Note.find({email:user})
        // console.log(Notes)




        return new Response(JSON.stringify({ ok: true,Notes}), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
