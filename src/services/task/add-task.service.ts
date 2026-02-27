import Task from '../../models/task.model.js';
import { AddTaskReq } from '../../types/task/add-task/add-task.request.js';

export const addTaskService = async (taskData: AddTaskReq) => {
  const newTask = new Task(taskData);
  await newTask.save();
  return newTask;
};
