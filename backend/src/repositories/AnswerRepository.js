import pgPool from "../configs/database.js";

class AnswerRepository {
  async createAnswer({ questionId, text, isCorrect, position }) {
    const result = await pgPool.query(
      `INSERT INTO quiz_options (
        quiz_id,
        text,
        is_correct,
        position
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [questionId, text, isCorrect, position],
    );
    return result.rows[0];
  }
  async getAnswers({ questionId }) {
    const result = await pgPool.query(
      `SELECT * FROM quiz_options WHERE quiz_id = $1`,
      [questionId],
    );
    return result.rows;
  }
  async updateAnswer({ answerId, text, isCorrect, position }) {
    const result = await pgPool.query(
      `UPDATE quiz_options
      SET text = $1,
          is_correct = $2,
          position = $3
      WHERE id = $4
      RETURNING *
      `,
      [text, isCorrect, position, answerId],
    );
    return result.rows[0];
  }
  async deleteAnswer({ answerId }) {
    const result = await pgPool.query(
      `DELETE FROM quiz_options
      WHERE id = $1
      RETURNING *
      `,
      [answerId],
    );
    return result.rows[0];
  }
}

const Answer = new AnswerRepository();
export default Answer;
