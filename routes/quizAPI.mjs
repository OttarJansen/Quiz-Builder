import express from "express";
import { validateQuiz } from "../middleware/validateQuiz.mjs";
import { createQuiz, deleteQuiz, getQuizById } from "../models/quiz.mjs";
import authMiddleware from "../middleware/auth.mjs";

const quizRouter = express.Router();

quizRouter.use(express.json());


quizRouter.post("/", authMiddleware, validateQuiz, async (req, res) => {
  try {
    const quizId = await createQuiz({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json({
      message: req.l10n.feedback.createdQuizSuccessfully,
      id: quizId,
      link: `/quiz/${quizId}`
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

quizRouter.get("/:id", async (req, res) => {
  const quiz = await getQuizById(req.params.id);

  if (!quiz) {
    return res.status(404).json({ error: req.l10n.errorCodes.quizNotFound });
  }

  res.json(quiz);
});

quizRouter.put("/:id", validateQuiz, (req, res) => {
  res.json({ message: req.l10n.feedback.updatedQuizSuccessfully });
});

quizRouter.delete("/:id", async (req, res) => {
  try {
    await deleteQuiz(req.params.id);
    res.status(200).json({ message: req.l10n.feedback.deletedQuizSuccessfully });
  } catch {
    res.status(404).json({ error: req.l10n.errorCodes.quizNotFound });
  }
});

export default quizRouter;