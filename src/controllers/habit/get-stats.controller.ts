import { Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { getHabitStatsService, GetHabitStatsQuery } from '../../services/habit/get-stats.service.js';

import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const getHabitCompletionStatistic = async (
  req: AuthRequest<any, any, any, GetHabitStatsQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getHabitStatsService(req.user?._id as string, req.query);
    return sendResponse(res, 200, { data: result, message: 'Get habit completion statistics successfully!' });
  } catch (error) {
    next(error);
  }
};
