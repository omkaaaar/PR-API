import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    res.status(400).json({ message: "Unauthorized access" });
    next(error);
  }
};

export const getUserSubscription = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      throw new Error("You are not authoized");
    }
    const userSubscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({ success: true, data: userSubscriptions });
  } catch (error) {
    res.status(404).json({ messaage: "no data found" });
    next(error);
  }
};

export const getSubscriptionDetails = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      throw new Error("No subscription found");
    }

    if (subscription.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    res.status(404).json({ messaage: "no data found" });
    next(error);
  }
};
