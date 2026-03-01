import pool from "../database/database.mjs";

export async function createQuiz({ title, questions }) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const testResult = await client.query(
      "INSERT INTO tests (title) VALUES ($1) RETURNING id",
      [title]
    );

    const testId = testResult.rows[0].id;

    for (const question of questions) {
      const questionResult = await client.query(
        "INSERT INTO questions (test_id, text) VALUES ($1, $2) RETURNING id",
        [testId, question.text]
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
    return testId;

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}


export async function getQuizById(quizId) {
  const testResult = await pool.query(
    "SELECT id, title FROM tests WHERE id = $1",
    [quizId]
  );

  if (testResult.rowCount === 0) {
    return null;
  }

  const test = testResult.rows[0];

  const questionsResult = await pool.query(
    "SELECT id, text FROM questions WHERE test_id = $1",
    [quizId]
  );

  const questions = [];

  for (const question of questionsResult.rows) {
    const optionsResult = await pool.query(
      "SELECT text, is_correct FROM options WHERE question_id = $1",
      [question.id]
    );

    questions.push({
      id: question.id,
      text: question.text,
      options: optionsResult.rows
    });
  }

  return {
    title: test.title,
    questions: questions.map(q => ({
      text: q.text,
      options: q.options
    }))
  };
}


export async function deleteQuiz(quizId) {
  const result = await pool.query("DELETE FROM tests WHERE id = $1 RETURNING *", [quizId]);

  if (result.rowCount === 0) {
    throw new Error("Quiz not found");
  }
}