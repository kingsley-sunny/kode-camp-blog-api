const { check } = require("express-validator");

class PostValidator {
  #minimumTitleLength = 5;
  #minimumContentLength = 10;

  validateCreatePost() {
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

  validateEditPost() {
    return [
      check("title", "Title must be at least 3 characters")
        .isLength({
          min: this.#minimumTitleLength,
        })
        .optional()
        .exists(),
      check("image", "Image must be a valid Image URL").isURL().exists().optional(),
      check("content", "Content of the post must be at least 10 characters")
        .optional()
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

module.exports = PostValidator;
