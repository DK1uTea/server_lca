import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { deleteTaskService } from '../../services/task/delete-task.service.js';

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.id as string;
  try {
    const deletedTask = await deleteTaskService(taskId);
    if (!deletedTask) {
      return sendResponse(res, 404, { data: null, message: 'Task not found' });
    }
    return sendResponse(res, 200, { data: null, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
