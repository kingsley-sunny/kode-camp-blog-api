const { Router } = require("express");
const AuthController = require("../controllers/auth/auth.controller");
const AuthValidator = require("../middlewares/validators/authValidator");
const CustomValidateResult = require("../middlewares/validators/validate");
const asyncWrapper = require("../middlewares/asyncWrapper");

const authRoute = Router();

const authController = new AuthController();
const authValidator = new AuthValidator();

// Login route
authRoute.post("/login", asyncWrapper(authController.login));

authController.getLogin;

// Register route
authRoute.post(
  "/register",
  authValidator.validateRegistration(),
  CustomValidateResult,
  asyncWrapper(authController.register)
);

module.exports = authRoute;
