import { quizSchema } from '../schema/quizSchema.mjs';

export function validateQuiz(req, res, next) {
  const { title, questions } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Missing or invalid title" });
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: "No questions provided" });
  }

  for (let q of questions) {
    if (!q.text || !Array.isArray(q.options) || q.options.length < 2 || !q.correctOption) {
      return res.status(400).json({ error: "Invalid question structure" });
    }
  }

  next();
}
