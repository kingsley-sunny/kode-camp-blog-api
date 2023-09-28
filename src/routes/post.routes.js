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
  postValidator.validatePostParams(),
  CustomValidateResult,
  asyncWrapper(postController.editPost)
);

postRoute.delete(
  "/:postId",
  authMiddleware.verifyToken,
  postValidator.validatePostParams(),
  CustomValidateResult,
  asyncWrapper(postController.deletePost)
);

postRoute.get("/", asyncWrapper(postController.getAllPosts));

postRoute.get(
  "/:postId",
  postValidator.validatePostParams(),
  asyncWrapper(postController.getSingePost)
);

module.exports = postRoute;
