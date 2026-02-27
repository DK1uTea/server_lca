import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { getTasksService } from '../../services/task/get-tasks.service.js';

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.params.userID as string;
  try {
    const tasks = await getTasksService(userID);
    return sendResponse(res, 200, { data: tasks, message: 'Get tasks successfully!' });
  } catch (error) {
    next(error);
  }
};
