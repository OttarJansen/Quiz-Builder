import express from "express";
import { createUser, deleteUser } from "../models/user.mjs";

const userRouter = express.Router();

userRouter.use(express.json());


userRouter.post("/", (req, res) => {
  try {
    const { consent } = req.body;

    const newUser = createUser(consent);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

userRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  try {
    deleteUser(id);
    res.status(204).end();
  } catch {
    res.status(404).json({ error: "User not found" });
  }
});

export default userRouter;