import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { editTaskService } from '../../services/task/edit-task.service.js';

export const editTask = async (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.id as string;
  try {
    const updatedTask = await editTaskService(taskId, req.body);
    if (!updatedTask) {
      return sendResponse(res, 404, { data: null, message: 'Task not found' });
    }
    return sendResponse(res, 200, { data: updatedTask, message: 'Updated task successfully' });
  } catch (error) {
    next(error);
  }
};
