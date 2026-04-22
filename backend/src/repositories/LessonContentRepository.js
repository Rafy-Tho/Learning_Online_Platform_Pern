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
    const query = `SELECT id FROM lesson_contents WHERE id = $1`;
    const values = [id];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async delete(id) {
    const query = `
      DELETE FROM lesson_contents WHERE id = $1 RETURNING *
    `;
    const values = [id];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async findByLessonId(lessonId) {
    const query = `SELECT * FROM lesson_contents WHERE lesson_id = $1`;
    const values = [lessonId];
    const result = await pgPool.query(query, values);
    return result.rows;
  }

  async getLessonContentsByCourseId(id) {
    const query = `
    SELECT lc.*
    FROM lesson_contents lc
    JOIN lessons ls ON lc.lesson_id = ls.id
    JOIN chapters ch ON ls.chapter_id = ch.id
    JOIN modules m ON ch.module_id = m.id
    WHERE m.course_id = $1
    `;
    const value = [id];
    const result = await pgPool.query(query, value);
    return result.rows;
  }
  async getInstructor(id) {
    const query = `
    SELECT c.instructor_id FROM courses c
    JOIN modules m ON m.course_id = c.id 
    JOIN  chapters ch ON ch.module_id = m.id
    JOIN lessons ls ON ls.chapter_id = ch.id
    JOIN lesson_contents lc ON lc.lesson_id = ls.id
    WHERE lc.id = $1
    `;
    const result = await pgPool.query(query, [id]);
    return result.rows[0];
  }
}

const LessonContent = new LessonContentRepository();

export default LessonContent;
