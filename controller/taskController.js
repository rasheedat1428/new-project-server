import * as service from "../service/taskServics.js";
import asyncHandler from "express-async-handler";

export const saveNewTask = asyncHandler(async (req, res) => {
  const payload = req.payload;
  if (payload && payload.id) {
    const { text, day, reminder } = req.body;
    if (!text || !day) {
      res.status(400);
      throw new Error("Please provide a task description and a date");
    }
    const savedTask = await service.addNewTask({
      owner: payload.id,
      text,
      day,
      reminder,
    });
    return res.status(201).json(taskResponse(savedTask));
  }
  res.status(401);
  throw new ErrorEvent("User is unauthorized or authenticated");
});

export const getUserTasks = asyncHandler(async (req, res) => {
  const payload = req.payload;
  if (payload && payload.id) {
    const userTasks = await service.getUserTasks(payload.id);

    return res.status(200).json(userTasks.map((task) => taskResponse(task)));
  }
  res.status(401);
  throw new Error("User is unauthorized");
});

export const getAllUsersTasks = asyncHandler(async (req, res) => {
  const payload = req.payload;
  if (payload && payload.id) {
    const role = payload.role;

    if (role && role === "admin") {
      const allTasks = await service.getAllTasks();
      return res.status(200).json(allTasks.map((task) => taskResponse(task)));
    } else {
      res.status(403);
      throw new Error("user is forbidden to access this resource");
    }
  }
  res.status(401);
  throw new Error("user is unauthorized or authenticated");
});

export const getTaskById = asyncHandler(async (req, res) => {
  const {
    payload,
    params: { id },
  } = req;

  if (payload && payload.id) {
    if (id) {
      const task = await service.getTask(id, payload.id);

      if (task && task.length > 0) {
        return res.status(200).json(taskResponse(task[0]));
      } else {
        res.status(401);
        throw new Error(`Task with id ${id} not found`);
      }
    } else {
      res.status(400);
      throw new Error("Task id parameter is missing.");
    }
  }
  res.status(401);
  throw new Error("User is unauthorized or authenticated");
});

export const updateUserTask = asyncHandler(async (req, res) => {
  const {
    payload,
    params: { id },
    body: { text, day, reminder },
  } = req;

  if (payload && payload.id) {
    if (id) {
      if (!text || !day) {
        res.status(400);
        throw new Error("Please provide a task description and date");
      }
      const task = await service.getTask(id, payload.id);
      if (task && task.length > 0) {
        const { id: taskId, reminder: taskReminder } = task[0];
        const updatedTask = await service.updateTask({
          id: taskId,
          text,
          day,
          reminder: reminder ? reminder : taskReminder,
        });
        return res.status(200).json(taskResponse(updatedTask));
      } else {
        res.status(404);
        throw new Error(`Task with id ${id} not found`);
      }
    } else {
      res.status(400);
      throw new Error("Task id parameter is missing.");
    }
  }
  res.status(401);
  throw new Error("User is unauthorized or authenticated");
});

export const deleteUserTask = asyncHandler(async (req, res) => {
  const {
    payload,
    params: { id },
  } = req;

  if (payload && payload.id) {
    if (id) {
      await service.deleteTask(id, payload.id);
      res.status(200).send("Deleted Successfully");
    } else {
      res.status(400);
      throw new Error("Task not Found");
    }
  }
});

const taskResponse = (task) => ({
  id: task.id,
  text: task.text,
  day: task.day,
  reminder: task.reminder,
});
