
export function validateQuiz(req, res, next) {
  const { title, questions } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: req.l10n.errorCodes.titleError });
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: req.l10n.errorCodes.questionsNotFound });
  }

  for (let q of questions) {
    if (
      !q.text ||
      !Array.isArray(q.options) ||
      q.options.length < 2 ||
      !Array.isArray(q.correctOptions) || 
      q.correctOptions.length === 0
    ) {
      return res.status(400).json({ error: req.l10n.errorCodes.invalidQuestionStructure });
    }
  }

  next();
}
