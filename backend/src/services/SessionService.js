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
    // to do: validate session
    return req.session.user;
  }
}

const sessionService = new SessionService();
export default sessionService;
