import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { getTransactionsByDayService } from '../../services/transaction/get-by-day.service.js';

export const getTransactionByDay = async (req: Request, res: Response, next: NextFunction) => {
  const { userID, day } = req.query;

  if (!userID || !day) {
    return sendResponse(res, 400, { data: null, message: "userID and day are required query parameters" });
  }

  try {
    const transactions = await getTransactionsByDayService(userID as string, day as string);
    return sendResponse(res, 200, {
      data: transactions,
      message: 'Transactions retrieved successfully!'
    });
  } catch (error) {
    next(error);
  }
};
