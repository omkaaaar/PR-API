import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../configs/configs.js";
import bcrypt from "bcryptjs";

const { JWT_SECRET } = config;

export const signUp = async (req, res) => {
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
  } catch (error) {
    res.status(400).send("Bad request: " + error.message);
  }
};
