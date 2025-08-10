import dotenv from "dotenv";
dotenv.config({ path: "./configs/.env" });
// console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

export default {
  PORT: process.env.PORT_NO || 3000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
