import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { getTaskStatsService } from '../../services/task/get-stats.service.js';

export const getTaskCompletionStatistic = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.params.userID as string;
  try {
    const result = await getTaskStatsService(userID as string);
    return sendResponse(res, 200, { data: result, message: 'Get task completion statistics successfully!' });
  } catch (error) {
    next(error);
  }
};
