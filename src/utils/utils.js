const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;
class Utils {
  static async hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  }

  static createAccessToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET);
  }

  static comparePassword(password, hashedPassword) {
    const isValid = bcrypt.compare(password, hashedPassword);
    return isValid;
  }
}

module.exports = Utils;
