const { Router } = require("express");
const PostController = require("../controllers/posts/post.controller");
const AuthMiddleware = require("../middlewares/auth/auth.middleware");
const PostValidator = require("../middlewares/validators/postValidator");
const { CustomValidation } = require("express-validator/src/context-items");
const CustomValidateResult = require("../middlewares/validators/validate");
const asyncWrapper = require("../middlewares/asyncWrapper");

const postRoute = Router();

const postController = new PostController();
const authMiddleware = new AuthMiddleware();
const postValidator = new PostValidator();

postRoute.post(
  "/",
  authMiddleware.verifyToken,
  postValidator.validateCreatePost(),
  CustomValidateResult,
  asyncWrapper(postController.create)
);

postRoute.patch(
  "/:postId",
  authMiddleware.verifyToken,
  postValidator.validateEditPost(),
  CustomValidateResult,
  asyncWrapper(postController.editPost)
);

postRoute.get("/", asyncWrapper(postController.getAllPosts));

postRoute.get("/:postId", asyncWrapper(postController.getSingePost));

module.exports = postRoute;
