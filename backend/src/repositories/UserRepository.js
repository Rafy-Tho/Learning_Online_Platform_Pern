import pgPool from "../configs/database.js";

class UserRepository {
  async create({ email, password, name, imageUrl }) {
    const query = `
      INSERT INTO users (email, password, name, image_url)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, role, name, image_url, created_at, updated_at
    `;

    const result = await pgPool.query(query, [email, password, name, imageUrl]);

    return result.rows[0];
  }

  async findByEmail(email) {
    const query = `
      SELECT id, email, role, password, last_login, 
      FROM users
      WHERE email = $1
    `;
    const result = await pgPool.query(query, [email]);

    return result.rows[0];
  }

  async update({ userId, email, name, imageUrl }) {
    const query = `
      UPDATE users
      SET email = $1, name = $2, image_url = $3
      WHERE id = $4
      RETURNING id, email, name, image_url
    `;

    const result = await pgPool.query(query, [email, name, imageUrl, userId]);

    return result.rows[0];
  }

  async createProfile(userId) {
    const query = `
      INSERT INTO user_profiles (user_id)
      VALUES ($1)
      RETURNING user_id
    `;
    const result = await pgPool.query(query, [userId]);

    return result.rows[0];
  }

  async updateProfile({ userId, bio, location, phone, dateBirth, gender }) {
    const query = `
      UPDATE user_profiles
      SET
        bio = $1,
        location = $2,
        phone = $3,
        date_birth = $4,
        gender = $5
      WHERE user_id = $6
      RETURNING *
    `;

    const result = await pgPool.query(query, [
      bio,
      location,
      phone,
      dateBirth,
      gender,
      userId,
    ]);

    return result.rows[0];
  }

  async profile(userId) {
    const query = `
      SELECT
        u.id,
        u.email,
        u.name,
        u.image_url,
        u.role,
        up.bio,
        up.location,
        up.phone,
        up.date_birth,
        up.gender,
        up.created_at,
        up.updated_at
      FROM users u
      LEFT JOIN user_profiles up
      ON u.id = up.user_id
      WHERE u.id = $1
    `;

    const result = await pgPool.query(query, [userId]);

    return result.rows[0];
  }

  async updatePassword({ userId, passwordHash }) {
    const query = `
      UPDATE users
      SET password = $1
      WHERE id = $2
    `;

    await pgPool.query(query, [passwordHash, userId]);
  }

  async findById(userId) {
    const query = `
      SELECT 
         id, email, role, last_login, name, image_url, password, created_at
      FROM users
      WHERE id = $1
    `;
    const result = await pgPool.query(query, [userId]);
    return result.rows[0];
  }
  async updateLastLogin({ userId, lastLogin }) {
    const query = `
      UPDATE users
      SET last_login = $1
      WHERE id = $2
    `;
    await pgPool.query(query, [lastLogin, userId]);
  }
  async getTotalStudents() {
    const query = `
      SELECT COUNT(*) AS total_users
      FROM users
      WHERE role = 'LEARNER'
    `;
    const result = await pgPool.query(query);
    return result.rows[0].total_users;
  }
  async getTotalInstructors() {
    const query = `
      SELECT COUNT(*) AS total_users
      FROM users
      WHERE role = 'INSTRUCTOR'
    `;
    const result = await pgPool.query(query);
    return result.rows[0].total_users;
  }

  async getInstructors() {
    const query = `
      SELECT *
      FROM users
      WHERE role = 'INSTRUCTOR'
    `;
    const result = await pgPool.query(query);
    return result.rows;
  }
}
const User = new UserRepository();
export default User;
