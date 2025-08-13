import Users from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await Users.find();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id).select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(404).send(error.message);
    next(error);
  }
};
