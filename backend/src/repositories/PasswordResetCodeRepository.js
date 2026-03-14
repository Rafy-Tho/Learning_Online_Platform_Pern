import pgPool from "../configs/database.js";

class PasswordResetCodeRepository {
  async create(code, userId, expiresAt) {
    const result = await pgPool.query(
      `
      INSERT INTO password_reset_codes (code, user_id, expires_at)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [code, userId, expiresAt],
    );

    return result.rows[0];
  }

  async findCode(code, userId) {
    const result = await pgPool.query(
      `
      SELECT *
      FROM password_reset_codes
      WHERE
        code = $1
        AND user_id = $2
      `,
      [code, userId],
    );
    return result.rows[0];
  }

  async incrementAttempt(userId) {
    const result = await pgPool.query(
      `
      UPDATE password_reset_codes
      SET attempts = attempts + 1
      WHERE user_id = $1
      RETURNING attempts
      `,
      [userId],
    );
    return result.rows[0]?.attempts;
  }

  async delete(userId) {
    const result = await pgPool.query(
      `
      DELETE FROM password_reset_codes
      WHERE user_id = $1
      RETURNING *
      `,
      [userId],
    );

    return result.rows[0];
  }
}

const PasswordResetCode = new PasswordResetCodeRepository();
export default PasswordResetCode;
