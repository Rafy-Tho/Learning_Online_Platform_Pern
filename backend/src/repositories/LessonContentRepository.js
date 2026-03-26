import pgPool from "../configs/database.js";

class LessonContentRepository {
  async create({ lessonId, name, position, content }) {
    const query = `INSERT INTO lesson_contents (
      lesson_id,
      name,
      position,
      content
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
    const values = [lessonId, name, position, content];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }

  async update({ id, name, position, content }) {
    const query = `UPDATE lesson_contents
      SET
        name = $1,
        position = $2,
        content = $3
      WHERE id = $4
      RETURNING *
    `;
    const values = [name, position, content, id];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async findById(id) {
    const query = `SELECT * FROM lesson_contents WHERE id = $1`;
    const values = [id];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
}

const LessonContent = new LessonContentRepository();

export default LessonContent;
