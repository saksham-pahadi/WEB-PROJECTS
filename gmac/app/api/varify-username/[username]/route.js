
import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

export async function GET(request) {
    try {

        const Url = request.url
        let result = true
        let getuser=[]
        const user =Url.split("/varify-username/")[1]
        // console.log("get user",user)


        await connectDB()
         getuser = await User.find({username:user})
        // console.log("got user",getuser)

        let available = true 
        if(getuser.length > 0){
            available = false
        }

        




        return new Response(JSON.stringify(available), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
