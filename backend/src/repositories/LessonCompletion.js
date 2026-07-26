import pgPool from "../configs/database.js";

class LessonCompletionRepository {
  async create({ courseId, userId, lessonId, timeSpentMinutes, xpEarned }) {
    const result = await pgPool.query(
      `INSERT INTO lesson_completion 
      (course_id, user_id, lesson_id, time_spent_minutes, xp_earned) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [courseId, userId, lessonId, timeSpentMinutes, xpEarned],
    );
    return result.rows[0];
  }
  async getCompletion({ courseId, userId, lessonId }) {
    const result = await pgPool.query(
      `SELECT * FROM lesson_completion 
      WHERE course_id = $1 AND user_id = $2 AND lesson_id = $3`,
      [courseId, userId, lessonId],
    );
    return result.rows[0];
  }
  async getCourseCompletions(courseId, userId) {
    const result = await pgPool.query(
      `SELECT lesson_id FROM lesson_completion 
      WHERE course_id = $1 AND user_id = $2`,
      [courseId, userId],
    );
    return result.rows.map((r) => r.lesson_id);
  }
}
const LessonCompletion = new LessonCompletionRepository();

export default LessonCompletion;
