import mongoose from "mongoose";


const MONGO_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGO_URI, {
      dbName: "gmac", // you can change this db name
    }); // ✅ no need for options
}

export default connectDB;