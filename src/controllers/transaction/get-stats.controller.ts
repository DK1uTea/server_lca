import { Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { getConsumptionStatsService, GetTransactionStatsQuery } from '../../services/transaction/get-stats.service.js';

import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const getConsumptionStatistics = async (
  req: AuthRequest<any, any, any, GetTransactionStatsQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getConsumptionStatsService(req.user?._id as string, req.query);
    return sendResponse(res, 200, { data: result, message: 'Get consumption statistics successfully!' });
  } catch (error) {
    next(error);
  }
};
