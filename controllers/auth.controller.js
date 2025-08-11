import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../configs/configs.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const { JWT_SECRET } = config;

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;

    // check if user exist
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exist");
    }
    // creating hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating new user
    const newUsers = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUsers._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token: token,
        userId: newUsers._id,
      },
    });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).send("Bad request: " + error.message);
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Incorrect credentials");
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    // res.status(400).send("Bad request: " + error.message);
    next(error);
  }
};
