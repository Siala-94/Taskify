import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const URI = process.env.MONGO_URI;
async function connectToDB() {
  try {
    await mongoose.connect(URI);
    console.log("connected to database");
  } catch (error) {
    console.error(error.message);
  }
}

export default connectToDB;
