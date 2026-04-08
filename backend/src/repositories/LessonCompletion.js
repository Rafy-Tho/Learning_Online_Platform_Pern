import pgPool from "../configs/database.js";

class LessonCompletionRepository {
  async create({ courseId, userId, lessonId, timeSpentMinutes, xpEarned }) {
    const result = await pgPool.query(
      `INSERT INTO lesson_completion 
      (course_id, user_id, lesson_id, time_spent_minutes, xp_earned) 
      VALUES ($1, $2, $3, $4, $5)`,
      [courseId, userId, lessonId, timeSpentMinutes, xpEarned],
    );
    return result.rows[0];
  }
}
const LessonCompletion = new LessonCompletionRepository();

export default LessonCompletion;
