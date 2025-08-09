import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const db = process.env.MONGO_URI

if(!db){
    throw new Error("Check Database connection string");
}

const connectDB = async () => {
    try{
        await mongoose.connect(db)
    }catch(error){
        console.log("Error connecting database", error);
    }
}

export default connectDB;