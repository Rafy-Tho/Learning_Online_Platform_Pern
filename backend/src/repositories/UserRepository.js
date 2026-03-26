import pgPool from "../configs/database.js";

class UserRepository {
  async create({ email, password, name, imageUrl }) {
    const query = `
      INSERT INTO users (email, password, name, image_url)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, role
    `;

    const result = await pgPool.query(query, [email, password, name, imageUrl]);

    return result.rows[0];
  }

  async findByEmail(email) {
    const query = `
      SELECT id, email, role, password
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

  async updateProfile({
    userId,
    bio,
    headLine,
    websiteUrl,
    youtubeUrl,
    twitterUrl,
    linkedInUrl,
  }) {
    const query = `
      UPDATE user_profiles
      SET
        bio = $1,
        headline = $2,
        website_url = $3,
        youtube_url = $4,
        twitter_url = $5,
        linkedin_url = $6
      WHERE user_id = $7
      RETURNING *
    `;

    const result = await pgPool.query(query, [
      bio,
      headLine,
      websiteUrl,
      youtubeUrl,
      twitterUrl,
      linkedInUrl,
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
        up.headline,
        up.website_url,
        up.youtube_url,
        up.twitter_url,
        up.linkedin_url
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
      SELECT *
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
}
const User = new UserRepository();
export default User;
