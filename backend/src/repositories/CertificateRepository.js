import pgPool from "../configs/database.js";

class CertificateRepository {
  async create({ userId, courseId, certificateNumber, certificateUrl }) {
    const result = await pgPool.query(
      `INSERT INTO certificates (user_id, course_id, certificate_number, certificate_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, courseId, certificateNumber, certificateUrl],
    );
    return result.rows[0];
  }

  async findByUserAndCourse({ userId, courseId }) {
    const result = await pgPool.query(
      `SELECT * FROM certificates WHERE user_id = $1 AND course_id = $2`,
      [userId, courseId],
    );
    return result.rows[0];
  }

  async findByUser(userId) {
    const result = await pgPool.query(
      `SELECT c.*, co.name AS course_name
       FROM certificates c
       JOIN courses co ON co.id = c.course_id
       WHERE c.user_id = $1
       ORDER BY c.issued_at DESC`,
      [userId],
    );
    return result.rows;
  }

  async findById(id) {
    const result = await pgPool.query(
      `SELECT c.*, co.name AS course_name, u.name AS user_name
       FROM certificates c
       JOIN courses co ON co.id = c.course_id
       JOIN users u ON u.id = c.user_id
       WHERE c.id = $1`,
      [id],
    );
    return result.rows[0];
  }

  async checkCourseCompletion({ userId, courseId }) {
    const result = await pgPool.query(
      `SELECT
         COUNT(DISTINCT l.id) AS total_lessons,
         COUNT(DISTINCT lc.lesson_id) AS completed_lessons
       FROM lessons l
       JOIN chapters ch ON ch.id = l.chapter_id
       JOIN modules m ON m.id = ch.module_id
       LEFT JOIN lesson_completion lc
         ON lc.lesson_id = l.id AND lc.user_id = $1
       WHERE m.course_id = $2`,
      [userId, courseId],
    );
    const { total_lessons: total, completed_lessons: completed } = result.rows[0];
    return { isComplete: Number(total) > 0 && Number(total) === Number(completed), total, completed };
  }
}

const Certificate = new CertificateRepository();
export default Certificate;
