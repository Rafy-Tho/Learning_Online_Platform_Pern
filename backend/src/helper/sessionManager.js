import { SESSION_MAX_AGE_SEC } from "../constants/constants.js";

class SessionManager {
  async createSession(req, userData) {
    return new Promise((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) return reject(err);
        req.session.user = {
          user_id: userData.user_id,
          name: userData.username,
          login_at: new Date(),
          role: userData.role,
          userAgent: req.headers["user-agent"],
          ip: (req.headers["x-forwarded-for"] || req.ip).split(",")[0].trim(),
        };
        resolve();
      });
    });
  }

  async destroySession(req) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  validateSession(req) {
    const session = req.session.user;
    if (!session) return false;

    const currentIp = (req.headers["x-forwarded-for"] || req.ip)
      .split(",")[0]
      .trim();

    const currentAgent = req.headers["user-agent"];

    // IP mismatch
    if (session.ip !== currentIp) return false;

    // Browser mismatch
    if (session.userAgent !== currentAgent) return false;

    // Session age check (example: 30 days)
    const SESSION_MAX_AGE = SESSION_MAX_AGE_SEC * 1000;

    if (Date.now() - session.login_at > SESSION_MAX_AGE) {
      return false;
    }

    return true;
  }
}

const sessionManager = new SessionManager();
export default sessionManager;
