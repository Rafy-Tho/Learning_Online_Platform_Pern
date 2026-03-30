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
  async update({ id, courseId, name, description, position, status }) {
    const result = await pgPool.query(
      `UPDATE modules
        SET course_id=$1,name=$2,description=$3,position=$4,status=$5
        WHERE id=$6
        RETURNING *
      `,
      [courseId, name, description, position, status, id],
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
}

const Module = new ModuleRepository();
export default Module;
