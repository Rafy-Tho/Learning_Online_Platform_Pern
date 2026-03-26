import pgPool from "../configs/database.js";

class CourseRepository {
  async create({
    instructorId,
    categoryId,
    name,
    slug,
    description,
    level,
    accessType,
    status,
    position,
  }) {
    const query = `INSERT INTO courses (
        instructor_id,
        category_id,
        name,
        slug,
        description,
        status,
        position,
        level,
        access_type
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const values = [
      instructorId,
      categoryId,
      name,
      slug,
      description,
      status,
      position,
      level,
      accessType,
    ];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async update({
    id,
    categoryId,
    name,
    slug,
    description,
    status,
    position,
    level,
    accessType,
  }) {
    const query = `UPDATE courses
      SET
        category_id = $1,
        name = $2,
        slug = $3,
        description = $4,
        status = $5,
        position = $6,
        level = $7,
        access_type = $8
      WHERE id = $9
      RETURNING *
    `;
    const values = [
      categoryId,
      name,
      slug,
      description,
      status,
      position,
      level,
      accessType,
      id,
    ];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async delete(id) {
    const query = `DELETE FROM courses
      WHERE id = $1
      RETURNING *
    `;
    const values = [id];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async findById(id) {
    const query = `SELECT * FROM courses
      WHERE id = $1
      AND deleted_at IS NULL
    `;
    const values = [id];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async findAll() {
    const query = `SELECT * FROM courses
      WHERE deleted_at IS NULL
    `;
    const result = await pgPool.query(query);
    return result.rows;
  }
  async findByCategoryId(category_id) {
    const query = `SELECT * FROM courses
      WHERE category_id = $1
      AND deleted_at IS NULL
    `;
    const values = [category_id];
    const result = await pgPool.query(query, values);
    return result.rows;
  }
  async findByInstructorId(instructorId) {
    const query = `SELECT * FROM courses
      WHERE instructor_id = $1
      AND deleted_at IS NULL
    `;
    const values = [instructorId];
    const result = await pgPool.query(query, values);
    return result.rows;
  }
}

const Course = new CourseRepository();

export default Course;
