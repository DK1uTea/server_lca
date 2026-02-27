import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { getConsumptionStatsService } from '../../services/transaction/get-stats.service.js';

export const getConsumptionStatistics = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.params.userID as string;
  try {
    const data = await getConsumptionStatsService(userID);
    return sendResponse(res, 200, { data, message: 'Get consumption statistics successfully!' });
  } catch (error) {
    next(error);
  }
};
