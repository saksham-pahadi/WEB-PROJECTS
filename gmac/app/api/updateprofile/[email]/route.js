import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

export async function POST(request) {

    try {

        const body = await request.json()
        // const { email, otp, fullname, dob, password } = body
        console.log("Body",body)

        const Url = request.url
        let getuser = []
        const user = Url.split("/updateprofile/")[1]

        await connectDB()
        getuser = await User.findOne({ email: user })
        getuser.name = body.name
        getuser.username = body.username
        getuser.bio = body.bio
        getuser.profilepic = body.picture
        getuser.links = body.links
        await getuser.save()
        console.log("got user",getuser)

        let available = false
        if (getuser.length > 0) {
            available = true
        }


        return new Response(JSON.stringify({available,body,success:true}), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}