const { Router } = require("express");
const TaskController = require("../controllers/tasks/task.controller");
const AuthMiddleware = require("../middlewares/auth/auth.middleware");
const TaskValidator = require("../middlewares/validators/taskValidator");
const { CustomValidation } = require("express-validator/src/context-items");
const CustomValidateResult = require("../middlewares/validators/validate");
const asyncWrapper = require("../middlewares/asyncWrapper");

const taskRoute = Router();

const taskController = new TaskController();
const authMiddleware = new AuthMiddleware();
const taskValidator = new TaskValidator();

taskRoute.post(
  "/",
  authMiddleware.verifyToken,
  taskValidator.validateCreateTask(),
  CustomValidateResult,
  asyncWrapper(taskController.create)
);

taskRoute.patch(
  "/:id",
  authMiddleware.verifyToken,
  taskValidator.validateEditTask(),
  CustomValidateResult,
  asyncWrapper(taskController.editTask)
);

taskRoute.get("/", authMiddleware.verifyToken, asyncWrapper(taskController.getAllTasks));

module.exports = taskRoute;
