import mongoose from "mongoose";
import User from "@/models/User";
import connectDB from "@/db/connectDb";
export async function CheckUserName(username) {
  await connectDB()
  const user = User.findOne({username})
  console.log("User->",user)
  return user;
}
