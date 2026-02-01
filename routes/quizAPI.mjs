import express from "express";
import { validateQuiz } from "../middleware/validateQuiz.mjs";

const quizRouter = express.Router();

quizRouter.use(express.json());


quizRouter.post("/", validateQuiz, (req, res) => {
  res.status(201).json({ message: "Quiz created" });
});

quizRouter.get("/", (req, res) => {
  res.json([]);
});

quizRouter.get("/:id", (req, res) => {
  res.json({ id: req.params.id });
});

quizRouter.put("/:id", validateQuiz, (req, res) => {
  res.json({ message: "Quiz updated" });
});

quizRouter.delete("/:id", (req, res) => {
  res.status(204).end();
});

export default quizRouter;