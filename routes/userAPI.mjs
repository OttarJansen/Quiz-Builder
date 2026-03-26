import express from "express";
import { createUser, deleteUser, getUserByUsername, verifyPassword } from "../models/user.mjs";
import securityAudit from "../middleware/security.mjs";

const userRouter = express.Router();

userRouter.use(express.json());


userRouter.post("/", securityAudit, async (req, res) => {
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

userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: req.l10n.errorCodes.missingCredentials });
    }

    const user = await getUserByUsername(username);

    if (!user || !verifyPassword(password, user.hashedpassword)) {
      return res.status(401).json({ error: req.l10n.errorCodes.invalidCredentials });
    }

    const { hashedpassword, ...userWithoutPassword } = user;
    res.json({ 
      message: req.l10n.feedback.successfulLogin,
      user: userWithoutPassword 
    });

  } catch (err) {
    res.status(500).json({ error: req.l10n.errorCodes.serverError });
  }
});

export default userRouter;