import pgPool from "../configs/database.js";

class QuestionRepository {
  async createQuestion({ lessonId, question, explanation, position }) {
    const result = await pgPool.query(
      `INSERT INTO quizzes (
        lesson_id,
        question,
        explanation,
        position
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [lessonId, question, explanation, position],
    );
    return result.rows[0];
  }
  async updateQuestion({ questionId, question, explanation, position }) {
    const result = await pgPool.query(
      `UPDATE quizzes
      SET question = $1,
          explanation = $2,
          position = $3
      WHERE id = $4
      RETURNING *
      `,
      [question, explanation, position, questionId],
    );
    return result.rows[0];
  }
  async deleteQuestion({ questionId }) {
    const result = await pgPool.query(
      `DELETE FROM quizzes
      WHERE id = 
      RETURNING *
      `,
      [questionId],
    );
    return result.rows[0];
  }
  async findById({ questionId }) {
    const result = await pgPool.query(
      `SELECT * FROM quizzes
      WHERE id = $1
      `,
      [questionId],
    );
    return result.rows[0];
  }
}

const Question = new QuestionRepository();

export default Question;
