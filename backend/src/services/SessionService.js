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
    const user = req.session.user;
    // 1. Session exists
    if (!user) return null;
    // 2. Required fields present
    if (!user.id || !user.role) return null;
    return user;
  }
}

const sessionService = new SessionService();
export default sessionService;
