import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB=async ()=>{
try {
  const res=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
console.log(`Database connected successfully`);
} catch (error) {
  console.log(`Unable to connect to database`);
}
}