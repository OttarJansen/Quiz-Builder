import pool from "../database/database.mjs";

export async function createQuiz({ title, questions, userId }) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const quizResult = await client.query(
      "INSERT INTO quizzes (title, user_id) VALUES ($1, $2) RETURNING id",
      [title, userId]
    );

    const quizId = quizResult.rows[0].id;

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      const questionResult = await client.query(
        "INSERT INTO questions (quiz_id, text, position) VALUES ($1, $2, $3) RETURNING id",
        [quizId, question.text, i]
      );

      const questionId = questionResult.rows[0].id;

      for (const option of question.options) {
        const isCorrect = question.correctOptions.includes(option);

        await client.query(
          "INSERT INTO options (question_id, text, is_correct) VALUES ($1, $2, $3)",
          [questionId, option, isCorrect]
        );
      }
    }

    await client.query("COMMIT");
    return quizId;

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}


export async function getQuizById(quizId) {
  const quizResult = await pool.query(
    "SELECT id, title FROM quizzes WHERE id = $1",
    [quizId]
  );

  if (quizResult.rowCount === 0) return null;

  const questionsResult = await pool.query(
    "SELECT id, text FROM questions WHERE quiz_id = $1 ORDER BY position",
    [quizId]
  );

  const questions = [];

  for (const question of questionsResult.rows) {
    const optionsResult = await pool.query(
      "SELECT id, text FROM options WHERE question_id = $1",
      [question.id]
    );

    questions.push({
      id: question.id,
      text: question.text,
      options: optionsResult.rows
    });
  }

  return {
    id: quizId,
    title: quizResult.rows[0].title,
    questions
  };
}


export async function deleteQuiz(quizId) {
  const result = await pool.query("DELETE FROM tests WHERE id = $1 RETURNING *", [quizId]);

  if (result.rowCount === 0) {
    throw new Error("Quiz not found");
  }
}