import pgPool from "../configs/database.js";

class ModuleRepository {
  async create(moduleData) {
    const { courseId, name, description, position, iconName, status } =
      moduleData;
    const result = await pgPool.query(
      `INSERT INTO modules (course_id,name,description,position,icon_name,status)
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *
      `,
      [courseId, name, description, position, iconName, status],
    );
    return result.rows[0];
  }
  async update(moduleData) {
    const { id, courseId, name, description, position, iconName, status } =
      moduleData;
    const result = await pgPool.query(
      `UPDATE modules
        SET course_id=$1,name=$2,description=$3,position=$4,icon_name=$5,status=$6
        WHERE id=$7
        RETURNING *
      `,
      [courseId, name, description, position, iconName, status, id],
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
  async findByCourseId(courseId) {
    const result = await pgPool.query(
      `SELECT *
        FROM modules
        WHERE course_id = $1
      `,
      [courseId],
    );
    return result.rows;
  }
}

const Module = new ModuleRepository();
export default Module;
