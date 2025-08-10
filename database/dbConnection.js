import mongoose from "mongoose";
import config from "../configs/configs.js";

const { MONGO_URI } = config;

// const db = MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Check Database connection string");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.log("Error connecting database", error);
  }
};

export default connectDB;
