import express from "express";
// import dotenv from "dotenv";

import config from "./configs/configs.js";

const { PORT } = config;

import userRoute from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectDB from "./database/dbConnection.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
// import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";

const app = express();
// dotenv.config();

app.use(express.json());
app.use(errorMiddleware);
app.use(cookieParser());
// app.use(arcjetMiddleware);

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/subscriptions", subscriptionRouter);

await connectDB()
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
