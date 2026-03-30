import pgPool from "../configs/database.js";

class CourseObjectiveRepository {
  async create({ courseId, content, position }) {
    const query = `INSERT INTO course_objectives (
      course_id,
      content,
      position
    )
    VALUES ($1, $2, $3)
    RETURNING *
  `;
    const values = [courseId, content, position];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }

  async update({ id, content, position }) {
    const query = `UPDATE course_objectives
      SET
        content = $1,
        position = $2
      WHERE id = $3
      RETURNING *
    `;
    const values = [content, position, id];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const query = `DELETE FROM course_objectives
      WHERE id = $1
      RETURNING *
    `;
    const values = [id];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async getByCourseId(courseId) {
    const query = `SELECT content FROM course_objectives
      WHERE course_id = $1
      ORDER BY position
    `;
    const values = [courseId];
    const result = await pgPool.query(query, values);
    return result.rows.map((row) => row.content);
  }
  async findById(id) {
    const query = `SELECT * FROM course_objectives
      WHERE id = $1
    `;
    const values = [id];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
}
const CourseObjective = new CourseObjectiveRepository();
export default CourseObjective;
