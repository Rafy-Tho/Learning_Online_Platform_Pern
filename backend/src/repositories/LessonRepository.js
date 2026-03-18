import pgPool from "../configs/database.js";

class LessonRepository {
  async create(lessonData) {
    const {
      chapterId,
      position,
      name,
      description,
      type,
      status,
      xpPoints,
      durationMinutes,
    } = lessonData;
    const query = `INSERT INTO lessons (
      chapter_id,
      position,
      name,
      description,
      type,
      status,
      xp_points,
      duration_minutes
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8
    )
    RETURNING *
  `;
    const values = [
      chapterId,
      position,
      name,
      description,
      type,
      status,
      xpPoints,
      durationMinutes,
    ];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async update(lessonData) {
    const {
      id,
      chapterId,
      position,
      name,
      description,
      type,
      status,
      xpPoints,
      durationMinutes,
    } = lessonData;
    const query = `UPDATE lessons
    SET
      chapter_id = $1,
      position = $2,
      name = $3,
      description = $4,
      type = $5,
      status = $6,
      xp_points = $7,
      duration_minutes = $8,
      updated_at = CURRENT_TIMESTAMP
    WHERE
      id = $9
    RETURNING *
  `;
    const values = [
      chapterId,
      position,
      name,
      description,
      type,
      status,
      xpPoints,
      durationMinutes,
      id,
    ];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async delete(id) {
    const query = `DELETE FROM lessons WHERE id = $1 RETURNING *`;
    const values = [id];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async findById(id) {
    const query = `SELECT * FROM lessons WHERE id = $1`;
    const values = [id];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async findByChapterId(chapter_id) {
    const query = `SELECT * FROM lessons WHERE chapter_id = $1`;
    const values = [chapter_id];
    const result = await pgPool.query(query, values);
    return result.rows;
  }
}
const Lesson = new LessonRepository();
export default Lesson;
