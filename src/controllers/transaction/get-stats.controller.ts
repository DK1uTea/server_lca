import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { getConsumptionStatsService } from '../../services/transaction/get-stats.service.js';

import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const getConsumptionStatistics = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = await getConsumptionStatsService(req.user?._id as string);
    return sendResponse(res, 200, { data, message: 'Get consumption statistics successfully!' });
  } catch (error) {
    next(error);
  }
};
