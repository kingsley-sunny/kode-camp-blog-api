const { Router } = require("express");
const TaskController = require("../controllers/tasks/task.controller");

const taskRoute = Router();
const taskController = new TaskController();

taskRoute.get("/", taskController.find);

module.exports = taskRoute;
