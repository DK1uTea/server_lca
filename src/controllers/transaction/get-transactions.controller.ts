import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';

import { AuthRequest } from '../../middlewares/auth.middleware.js';
import { getTransactionsService } from '../../services/transaction/get-transactions.service.js';
import { PaginationType } from '../../types/query_types.js';

export type getTransactionsQuery = PaginationType &  {
  type?: string; // e.g. "Income,Expense"
  createdDate?: string; // e.g. "2024-01-01"
}

export const getTransactions = async (req: AuthRequest, res: Response, next: NextFunction) => {

  try {
    const transactions = await getTransactionsService(req.user?._id as string, req.query);
    return sendResponse(res, 200, {
      data: transactions,
      message: 'Transactions retrieved successfully!'
    });
  } catch (error) {
    next(error);
  }
};
