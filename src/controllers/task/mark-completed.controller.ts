import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { markTaskAsCompletedService } from '../../services/task/mark-completed.service.js';

export const markTaskAsCompleted = async (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.id as string;
  try {
    const task = await markTaskAsCompletedService(taskId);
    if (!task) {
      return sendResponse(res, 404, { data: null, message: 'Task not found' });
    }
    return sendResponse(res, 200, { data: task, message: 'Task marked as completed' });
  } catch (error) {
    next(error);
  }
};
