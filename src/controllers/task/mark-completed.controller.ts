import { Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { markTaskAsCompletedService } from '../../services/task/mark-completed.service.js';
import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const markTaskAsCompleted = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const taskId = req.params.id as string;
  try {
    const task = await markTaskAsCompletedService(taskId, req.user?._id as string);
    if (!task) {
      return sendResponse(res, 404, { data: null, message: 'Task not found' });
    }
    return sendResponse(res, 200, { data: task, message: 'Task marked as completed' });
  } catch (error) {
    next(error);
  }
};
