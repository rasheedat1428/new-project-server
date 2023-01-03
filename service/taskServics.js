import TaskModel from "../model/task.js";

export const addNewTask = async (task) => {
  const savedTask = await TaskModel.create(task);
  return savedTask;
};

export const updateTask = async (task) => {
  const updateTask = await TaskModel.findByIdAndUpdate(task.id, task, {
    returnDocument: "after",
  });
  return updateTask;
};

export const deleteTask = async (taskId) => {
  return await TaskModel.findByIdAndRemove(taskId);
};

export const getUserTasks = async (owner) => {
  const tasks = await TaskModel.find({ owner });
  return tasks;
};

export const getTask = async (id, owner) => {
  const task = await TaskModel.find({ _id: id, owner });
  return task;
};

export const getAllTasks = async () => {
  const tasks = await TaskModel.find();
  return tasks;
};
