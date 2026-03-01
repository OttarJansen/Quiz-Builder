import express from "express";
import { validateQuiz } from "../middleware/validateQuiz.mjs";
import { createQuiz, deleteQuiz, getQuizById } from "../models/quiz.mjs";

const quizRouter = express.Router();

quizRouter.use(express.json());


quizRouter.post("/", validateQuiz, async (req, res) => {
  try {
    const quizId = await createQuiz(req.body);
    res.status(201).json({ message: "Quiz created", id: quizId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

quizRouter.get("/", (req, res) => {
  res.json([]);
});

quizRouter.get("/:id", async (req, res) => {
  const quiz = await getQuizById(req.params.id);

  if (!quiz) {
    return res.status(404).json({ error: "Quiz not found" });
  }

  res.json(quiz);
});

quizRouter.put("/:id", validateQuiz, (req, res) => {
  res.json({ message: "Quiz updated" });
});

quizRouter.delete("/:id", async (req, res) => {
  try {
    await deleteQuiz(req.params.id);
    res.status(200).json({ message: "Quiz deleted" });
  } catch {
    res.status(404).json({ error: "Quiz not found" });
  }
});

export default quizRouter;