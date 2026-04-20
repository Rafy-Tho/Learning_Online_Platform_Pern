import pgPool from "../configs/database.js";

class ChapterRepository {
  async create({ moduleId, position, name, description, status }) {
    const result = await pgPool.query(
      "INSERT INTO chapters (module_id, position, name, description, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [moduleId, position, name, description, status],
    );
    return result.rows[0];
  }
  async findById(id) {
    const result = await pgPool.query("SELECT * FROM chapters WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  }
  async findByModuleId(moduleId) {
    const result = await pgPool.query(
      "SELECT * FROM chapters WHERE module_id = $1",
      [moduleId],
    );
    return result.rows;
  }
  async update({ id, position, name, description, status }) {
    const result = await pgPool.query(
      "UPDATE chapters SET position = $1, name = $2, description = $3, status = $4 WHERE id = $5 RETURNING *",
      [position, name, description, status, id],
    );
    return result.rows[0];
  }
  async delete(id) {
    const result = await pgPool.query(
      "DELETE FROM chapters WHERE id = $1 RETURNING *",
      [id],
    );
    return result.rows[0];
  }

  async getChaptersByCourseId(id) {
    const result = await pgPool.query(
      `SELECT ch.*
       FROM chapters ch
       JOIN modules m ON ch.module_id = m.id
       WHERE m.course_id = $1`,
      [id],
    );
    return result.rows;
  }
}
const Chapter = new ChapterRepository();
export default Chapter;
