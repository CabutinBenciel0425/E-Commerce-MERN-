import mongoose from "mongoose";
import { MONGODB_URI } from "../config/envVars.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error on connectDB: ${error.message}`);
    process.exit(1);
  }
};
