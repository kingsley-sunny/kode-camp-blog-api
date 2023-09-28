const { check } = require("express-validator");

class AuthValidator {
  #minimumLength = 5;

  validateRegistration() {
    return [
      check("username", "Username must be at least 3 characters").isLength({ min: 3 }),
      check("password", "Password must be at least 5 characters").isLength({
        min: this.#minimumLength,
      }),
    ];
  }
}

module.exports = AuthValidator;
