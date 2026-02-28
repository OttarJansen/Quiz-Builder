import express from "express";
import { createUser, deleteUser } from "../models/user.mjs";

const userRouter = express.Router();

userRouter.use(express.json());


userRouter.post("/", async (req, res) => {
  try {
    const { username, consent, hashedPassword } = req.body;

    if (!consent) throw new Error("User must consent to ToS");

    const newUser = await createUser({ username, consent, hashedPassword });
    res.status(201).json(newUser);

  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Username already exists" });
    }

    res.status(400).json({ error: err.message });
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).end();
  } catch {
    res.status(404).json({ error: "User not found" });
  }
});

export default userRouter;