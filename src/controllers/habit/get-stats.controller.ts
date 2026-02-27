import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { getHabitStatsService } from '../../services/habit/get-stats.service.js';

import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const getHabitCompletionStatistic = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const stats = await getHabitStatsService(req.user?._id as string);
    return sendResponse(res, 200, { data: stats, message: 'Get habit completion statistics successfully!' });
  } catch (error) {
    next(error);
  }
};
