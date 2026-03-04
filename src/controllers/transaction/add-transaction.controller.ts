import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { addTransactionService } from '../../services/transaction/add-transaction.service.js';

import { AuthRequest } from '../../middlewares/auth.middleware.js';

export type AddTransactionReq = {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description?: string;
}

export const addTransaction = async (
  req: AuthRequest<
    any,
    any,
    AddTransactionReq,
    any
  >,
  res: Response,
  next: NextFunction) => {
  try {
    const newTransaction = await addTransactionService(req.body, req.user?._id as string);
    return sendResponse(res, 201, {
      data: newTransaction,
      message: 'Add transaction successfully!'
    });
  } catch (error) {
    next(error);
  }
};
