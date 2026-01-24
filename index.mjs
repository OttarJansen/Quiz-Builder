import express from 'express';
import { validateQuiz } from './middleware/validateQuiz.mjs';

const app = express()
const port = 3000

app.use(express.json());

app.post('/quiz', validateQuiz, (req, res) => {
  res.status(201).json({ message: "Quiz is valid" });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
