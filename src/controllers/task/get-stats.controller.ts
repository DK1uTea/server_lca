import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { getTaskStatsService } from '../../services/task/get-stats.service.js';

import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const getTaskCompletionStatistic = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await getTaskStatsService(req.user?._id as string);
    return sendResponse(res, 200, { data: result, message: 'Get task completion statistics successfully!' });
  } catch (error) {
    next(error);
  }
};
