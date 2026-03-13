import bcrypt from "bcrypt";

class HashService {
  async hash(value) {
    const saltRounds = 12;
    return await bcrypt.hash(value, saltRounds);
  }

  async verify(value, hashedValue) {
    return await bcrypt.compare(value, hashedValue);
  }
}

const hashService = new HashService();

export default hashService;
