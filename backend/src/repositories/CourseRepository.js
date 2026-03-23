import pgPool from "../configs/database.js";

class CourseRepository {
  async create(courseData) {
    const {
      instructorId,
      categoryId,
      name,
      slug,
      description,

      status,
      price,
      position,
    } = courseData;

    const query = `INSERT INTO courses (
        instructor_id,
        category_id,
        name,
        slug,
        description,
        status,
        price,
        position
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [
      instructorId,
      categoryId,
      name,
      slug,
      description,
      status,
      price,
      position,
    ];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async update(courseData) {
    const {
      id,
      instructorId,
      categoryId,
      name,
      slug,
      description,
      status,
      price,
      position,
    } = courseData;

    const query = `UPDATE courses
      SET
        instructor_id = $1,
        category_id = $2,
        name = $3,
        slug = $4,
        description = $5,
        status = $6,
        price = $7,
        position = $8
      WHERE id = $9
      RETURNING *
    `;
    const values = [
      instructorId,
      categoryId,
      name,
      slug,
      description,
      status,
      price,
      position,
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
  async findByInstructorId(instructor_id) {
    const query = `SELECT * FROM courses
      WHERE instructor_id = $1
      AND deleted_at IS NULL
    `;
    const values = [instructor_id];
    const result = await pgPool.query(query, values);
    return result.rows;
  }
}

const Course = new CourseRepository();

export default Course;
