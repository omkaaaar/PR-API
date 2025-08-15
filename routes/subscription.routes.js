import { Router } from "express";
import {
  createSubscription,
  getUserSubscription,
} from "../controllers/subscription.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "GET user Subscription" })
);

subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "GET Subscription detail" })
);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE Subscription detail" })
);

subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE Subscription detail" })
);

subscriptionRouter.get("/user/:id", authorize, getUserSubscription);

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "CANCEL Subscription detail" })
);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "GET upcoming renewals" })
);

export default subscriptionRouter;
