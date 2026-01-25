import express from 'express';
import { validateQuiz } from './middleware/validateQuiz.mjs';

const app = express();
const port = 3000;
app.use(express.json());

app.post('/quizzes', validateQuiz, (req, res) => {
  res.status(201).json({ message: "Quiz created" });
});

app.get('/quizzes', (req, res) => {
  res.json([]);
});

app.get('/quizzes/:id', (req, res) => {
  res.json({ id: req.params.id });
});

app.put('/quizzes/:id', validateQuiz, (req, res) => {
  res.json({ message: "Quiz updated" });
});

app.delete('/quizzes/:id', (req, res) => {
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
