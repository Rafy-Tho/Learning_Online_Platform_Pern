import pgPool from "../configs/database.js";

class LessonRepository {
  async create({
    chapterId,
    position,
    name,
    description,
    type,
    status,
    xpPoints,
    accessType,
    durationMinutes,
  }) {
    const query = `INSERT INTO lessons (
      chapter_id,
      position,
      name,
      description,
      type,
      status,
      xp_points,
      access_type,
      duration_minutes
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING * `;
    const values = [
      chapterId,
      position,
      name,
      description,
      type,
      status,
      xpPoints,
      accessType,
      durationMinutes,
    ];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async update({
    lessonId,
    chapterId,
    position,
    name,
    description,
    type,
    status,
    xpPoints,
    accessType,
    durationMinutes,
  }) {
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
      access_type = $9,
    WHERE
      id = $10
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
      accessType,
      lessonId,
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

  async getFirstLesson(courseId) {
    const query = `
     SELECT l.id
     FROM lessons AS l
     JOIN chapters AS c ON l.chapter_id = c.id
     JOIN modules AS m ON c.module_id = m.id
     WHERE m.course_id = $1
     ORDER BY 
     m.position ASC,
     c.position ASC,
     l.position ASC
     LIMIT 1`;
    const values = [courseId];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }

  async getQuestions(lessonId) {
    const query = `SELECT 
  q.id,
  q.question,
  q.explanation,
  q.position,
  json_agg(
    json_build_object(
      'text', qo.text,
      'is_correct', qo.is_correct,
      'position', qo.position
    ) ORDER BY qo.position
  ) AS options
  FROM quizzes q
  JOIN quiz_options qo ON qo.quiz_id = q.id
  WHERE q.lesson_id = $1
  GROUP BY q.id
  ORDER BY q.position;`;
    const values = [lessonId];
    const result = await pgPool.query(query, values);
    return result.rows;
  }

}
const Lesson = new LessonRepository();
export default Lesson;
