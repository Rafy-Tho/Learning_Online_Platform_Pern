import pgPool from "../configs/database.js";

class CategoryRepository {
  async findAll() {
    const query = `SELECT *
      FROM categories
    `;
    const result = await pgPool.query(query);
    return result.rows;
  }
  async create({ name, slug, description }) {
    const query = `INSERT INTO categories (name,slug,description)
      VALUES ($1,$2,$3)
      RETURNING *
    `;
    const result = await pgPool.query(query, [name, slug, description]);
    return result.rows[0];
  }
  async findById(categoryId) {
    const query = `SELECT *
      FROM categories
      WHERE id = $1
    `;
    const result = await pgPool.query(query, [categoryId]);
    return result.rows[0];
  }
  async findBySlug(slug) {
    const query = `SELECT *
      FROM categories
      WHERE slug = $1
    `;
    const result = await pgPool.query(query, [slug]);
    return result.rows[0];
  }
  async update({ categoryId, name, slug, description }) {
    const query = `UPDATE categories
      SET name = $1, slug = $2, description = $3
      WHERE id = $4
      RETURNING *
    `;
    const result = await pgPool.query(query, [
      name,
      slug,
      description,
      categoryId,
    ]);
    return result.rows[0];
  }
  async delete(categoryId) {
    const query = `DELETE FROM categories
      WHERE id = $1
    `;
    await pgPool.query(query, [categoryId]);
  }
}
const Category = new CategoryRepository();
export default Category;
