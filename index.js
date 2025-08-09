import express from "express";
import dotenv from "dotenv";

import userRoute from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectDB from "./database/dbConnection.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(errorMiddleware);
app.use(cookieParser());

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRoute);
app.use("api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

await connectDB()
  .then(() => {
    console.log("Connected to Database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
