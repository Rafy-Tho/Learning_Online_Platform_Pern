import pgPool from "../configs/database.js";

class EnrollmentRepository {
  async enroll({ courseId, userId, accessType }) {
    const result = await pgPool.query(
      `INSERT INTO enrollments 
      (course_id, user_id, access_type) 
      VALUES ($1, $2, $3)`,
      [courseId, userId, accessType],
    );
    return result.rows[0];
  }
  async findOne({ courseId, userId }) {
    const result = await pgPool.query(
      `SELECT * FROM enrollments WHERE course_id = $1 AND user_id = $2`,
      [courseId, userId],
    );
    return result.rows[0];
  }
}

const Enrollment = new EnrollmentRepository();

export default Enrollment;
