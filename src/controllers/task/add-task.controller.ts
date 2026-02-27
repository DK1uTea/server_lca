import { Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { addTaskService } from '../../services/task/add-task.service.js';
import { AddTaskReq } from '../../types/task/add-task/add-task.request.js';
import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const addTask = async (
  req: AuthRequest<any, any, AddTaskReq>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTask = await addTaskService({ ...req.body, userId: req.user?._id as string });
    return sendResponse(res, 201, {
      data: newTask,
      message: 'Task added successfully!'
    });
  } catch (error) {
    next(error);
  }
};
