import mongoose from "mongoose";
import config from "../config/config.js";
const mongo_url = config.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
}

export default connectDB;
