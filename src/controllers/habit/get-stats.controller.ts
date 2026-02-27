import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { getHabitStatsService } from '../../services/habit/get-stats.service.js';

export const getHabitCompletionStatistic = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.params.userID as string;
  try {
    const stats = await getHabitStatsService(userID);
    return sendResponse(res, 200, { data: stats, message: 'Get habit completion statistics successfully!' });
  } catch (error) {
    next(error);
  }
};
