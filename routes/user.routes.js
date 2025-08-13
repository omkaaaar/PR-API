import { Router } from "express";
import { getUser, getUsers } from "../controllers/users.controller.js";

const userRoute = Router();

userRoute.get("/", getUsers);

userRoute.get("/:id", getUser);

userRoute.post("/", (req, res) => res.send({ title: "CREATE new users" }));

userRoute.put("/:id", (req, res) => res.send({ title: "UPDATE user by ID" }));

userRoute.delete("/id", (req, res) => res.send({ title: "DELETE user by ID" }));

export default userRoute;
