import pgPool from "../configs/database.js";

class UserModel {
  async createUser(data) {
    const { email, password, name, imageUrl } = data;
    const query = `INSERT INTO users (email, password, name, image_url)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, role`;
    const values = [email, password, name, imageUrl];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async findUserByEmail(data) {
    const { email } = data;
    const query = `SELECT id, email, role, password FROM users WHERE email = $1`;
    const values = [email];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async updateInfo(userId, data) {
    const { email, name, imageUrl } = data;
    const query = `UPDATE users SET email = $1, name = $2, image_url = $3 WHERE id = $4 RETURNING id, email, name, image_url`;
    const values = [email, name, imageUrl, userId];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async createProfile(userId) {
    const query = `INSERT INTO user_profiles (user_id)
      VALUES ($1)
      RETURNING user_id`;
    const values = [userId];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async updateProfile(userId, data) {
    const { bio, headLine, websiteUrl, youTubeUrl, twitterUrl, linkedInUrl } =
      data;
    const query = `UPDATE user_profiles SET about = $1, head_line = $2, website_url = $3, youtube_url = $4, twitter_url = $5, linkedin_url = $6 WHERE user_id = $7 RETURNING user_id, about, head_line, website_url, youtube_url, twitter_url, linkedin_url`;
    const values = [
      bio,
      headLine,
      websiteUrl,
      youTubeUrl,
      twitterUrl,
      linkedInUrl,
      userId,
    ];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async getAllInfo(userId) {
    const query = `SELECT u.id, u.email, u.name, u.image_url, up.about, up.head_line, up.website_url, up.youtube_url, up.twitter_url, up.linkedin_url , u.role FROM users u LEFT JOIN user_profiles up ON u.id = up.user_id WHERE u.id = $1`;
    const values = [userId];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async updatePassword(userId, passwordHash) {
    const query = `UPDATE users SET password = $1 WHERE id = $2`;
    const values = [passwordHash, userId];
    await pgPool.query(query, values);
  }
}

const User = new UserModel();

export default User;
