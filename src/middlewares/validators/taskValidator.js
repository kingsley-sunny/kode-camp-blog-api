const { check } = require("express-validator");

class TaskValidator {
  #minimumTitleLength = 5;
  #minimumContentLength = 10;

  validateCreateTask() {
    return [
      check("title", "Title must be at least 3 characters")
        .isLength({
          min: this.#minimumTitleLength,
        })
        .exists(),
      check("image", "Image must be a valid Image URL").isURL().exists(),
      check("content", "Content of the post must be at least 10 characters")
        .isLength({
          min: this.#minimumContentLength,
        })
        .exists(),
      check("slug", "Blog post slug must be at least 3 characters")
        .isLength({ min: this.#minimumContentLength })
        .optional(),
    ];
  }
}

module.exports = TaskValidator;
