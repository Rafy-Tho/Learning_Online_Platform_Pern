import pgPool from "../configs/database.js";

class ModuleRepository {
  async create({ courseId, name, description, position, status }) {
    const result = await pgPool.query(
      `INSERT INTO modules (course_id,name,description,position,status)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *
      `,
      [courseId, name, description, position, status],
    );
    return result.rows[0];
  }
  async update({ id, name, description, position, status }) {
    const result = await pgPool.query(
      `UPDATE modules
        SET name=$1,description=$2,position=$3,status=$4
        WHERE id=$5
        RETURNING *
      `,
      [name, description, position, status, id],
    );
    return result.rows[0];
  }
  async findById(moduleId) {
    const result = await pgPool.query(
      `SELECT *
        FROM modules
        WHERE id = $1
      `,
      [moduleId],
    );
    return result.rows[0];
  }
  async delete(moduleId) {
    const result = await pgPool.query(
      `DELETE FROM modules
        WHERE id = $1
        RETURNING *
      `,
      [moduleId],
    );
    return result.rows[0];
  }
  async getModulesByCourseId(courseId) {
    const result = await pgPool.query(
      `SELECT * 
        FROM modules 
        WHERE course_id = $1
      `,
      [courseId],
    );
    return result.rows;
  }
  async getInstructor(id) {
    const query = `
    SELECT c.instructor_id FROM courses c
    JOIN modules m ON m.course_id = c.id 
    WHERE m.id = $1
    `;
    const result = await pgPool.query(query, [id]);
    return result.rows[0];
  }
}

const Module = new ModuleRepository();
export default Module;
