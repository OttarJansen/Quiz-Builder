import express from "express";
import { createUser, deleteUser } from "../models/user.mjs";

const userRouter = express.Router();

userRouter.use(express.json());


userRouter.post("/", async (req, res) => {
  try {
    const { username, consent, hashedPassword } = req.body;

    if (!consent) throw new Error(req.l10n.errorCodes.missingConsent);

    const newUser = await createUser({ username, consent, hashedPassword });
    res.status(201).json({ message: req.l10n.feedback.successfulUserCreation, user: newUser });

  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: req.l10n.errorCodes.duplicateUserName });
    }

    res.status(400).json({ error: err.message });
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(200).json({ message: req.l10n.feedback.successfulUserDeletion });
  } catch {
    res.status(404).json({ error: req.l10n.errorCodes.userNotFound });
  }
});

export default userRouter;