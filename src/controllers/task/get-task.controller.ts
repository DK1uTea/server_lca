import { Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { getTasksService } from '../../services/task/get-tasks.service.js';
import { AuthRequest } from '../../middlewares/auth.middleware.js';

export type GetTaskParams = {
}

export type GetTaskQuery = {
  page?: number;
  limit?: number;
  sort?: 'asc' | 'desc';
  sortBy?: string;
  search?: string;
  priority?: string; // e.g. "low,high"
  status?: string;   // e.g. "pending,completed"
}

export const getTask = async (
  req: AuthRequest<
    GetTaskParams,
    any,
    any,
    GetTaskQuery
  >,
  res: Response, next: NextFunction
) => {
  const queryParams = req.query;
  try {
    const tasks = await getTasksService(req.user?._id as string, queryParams);
    return sendResponse(res, 200, { data: tasks, message: 'Get tasks successfully!' });
  } catch (error) {
    next(error);
  }
};
