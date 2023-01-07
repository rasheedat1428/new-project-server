import express from "express";
import * as controller from "../controller/taskController.js";
import { authenticate } from "../middleware/authService.js";

const taskRoute = express.Router();

taskRoute
  .post("/", authenticate, controller.saveNewTask)
  .get("/", authenticate, controller.getUserTasks)
  .get("/all", authenticate, controller.getAllUsersTasks)
  .delete("/:id", authenticate, controller.deleteUserTask)
  .put("/:id", authenticate, controller.updateUserTask)
  .get("/:id", authenticate, controller.getTaskById)
  .patch("/:id", authenticate, controller.updateUserTaskById);

export default taskRoute;
