import pgPool from "../configs/database.js";

class LearningProgressRepository {
  async create({ courseId, userId, lessonId }) {
    const result = await pgPool.query(
      `INSERT INTO learn_progress 
      (course_id, user_id, lesson_id) 
      VALUES ($1, $2, $3)`,
      [courseId, userId, lessonId],
    );
    return result.rows[0];
  }
  async update({ courseId, userId, lessonId }) {
    const result = await pgPool.query(
      `UPDATE learn_progress 
      SET lesson_id = $3
      WHERE course_id = $1 AND user_id = $2`,
      [courseId, userId, lessonId],
    );
    return result.rows[0];
  }
  async findOne({ courseId, userId }) {
    const result = await pgPool.query(
      `SELECT * FROM learn_progress WHERE course_id = $1 AND user_id = $2`,
      [courseId, userId],
    );
    return result.rows[0];
  }
}

const LearningProgress = new LearningProgressRepository();

export default LearningProgress;
