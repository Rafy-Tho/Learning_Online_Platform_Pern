import { SESSION_MAX_AGE_SEC } from "../constants/constants.js";

class SessionService {
  async create(req, user) {
    return new Promise((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) return reject(err);

        req.session.user = {
          id: user.id,
          name: user.name,
          role: user.role,
          loginAt: new Date(),
          userAgent: req.headers["user-agent"],
          ip: (req.headers["x-forwarded-for"] || req.ip).split(",")[0].trim(),
        };
        resolve();
      });
    });
  }

  async destroy(req) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  validate(req) {
    const session = req.session.user;
    if (!session) return false;

    const currentIp = (req.headers["x-forwarded-for"] || req.ip)
      .split(",")[0]
      .trim();

    const currentAgent = req.headers["user-agent"];

    if (session.ip !== currentIp) return false;

    if (session.userAgent !== currentAgent) return false;

    const SESSION_MAX_AGE = SESSION_MAX_AGE_SEC * 1000;

    if (Date.now() - new Date(session.loginAt).getTime() > SESSION_MAX_AGE) {
      return false;
    }

    return true;
  }
}

const sessionService = new SessionService();
export default sessionService;
