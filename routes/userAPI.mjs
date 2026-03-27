import express from "express";
import { createUser, getUserByUsername, verifyPassword, anonymizeUser, sanitizeUser } from "../models/user.mjs";
import securityAudit from "../middleware/security.mjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.mjs";

const userRouter = express.Router();

userRouter.use(express.json());


userRouter.post("/", securityAudit, async (req, res) => {
  try {
    const { username, consent, hashedPassword } = req.body;

    if (!consent) throw new Error(req.l10n.errorCodes.missingConsent);

    const newUser = await createUser({ username, consent, hashedPassword });
    res.status(201).json({ 
      message: req.l10n.feedback.successfulUserCreation, 
      user: sanitizeUser(newUser) 
    });

  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: req.l10n.errorCodes.duplicateUsername });
    }

    res.status(400).json({ error: err.message });
  }
});

userRouter.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ error: req.l10n.errorCodes.unauthorized });
    }

    await anonymizeUser(req.params.id);

    res.status(200).json({ 
      message: req.l10n.feedback.successfullyAnonymized 
    });

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

    if (!user.consent) {
      return res.status(403).json({ error: req.l10n.errorCodes.deactivatedUser });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username }, 
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ 
      message: req.l10n.feedback.successfulLogin,
      user: sanitizeUser(user),
      token
    });

  } catch (err) {
    res.status(500).json({ error: req.l10n.errorCodes.serverError });
  }
});

userRouter.get("/profile", authMiddleware, async (req, res) => {
  const user = await getUserByUsername(req.user.username);
  res.json({ user: sanitizeUser(user) });
});

export default userRouter;