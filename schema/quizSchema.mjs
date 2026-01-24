export const quizSchema = {
  title: { type: "string", required: true },
  description: { type: "string", required: false },
  questions: {
    type: "array",
    required: true,
    minLength: 1,
    items: {
      text: { type: "string", required: true },
      options: { type: "array", required: true, minLength: 2 },
      correctOption: { type: "string", required: true }
    }
  }
};
