// app/api/auth/requestOtp/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Note from "@/model/Note";

export async function POST(req) {
    try {
        const newNote = await req.json();
        console.log(newNote);
        const email = newNote.email;



        await dbConnect();

        

        const newnote = await Note.create({             
            email: newNote.email,
            title: newNote.title,
            content: newNote.content
        });







        return new Response(JSON.stringify({ ok: true}), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
