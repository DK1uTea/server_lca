import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { addTransactionService } from '../../services/transaction/add-transaction.service.js';

import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const addTransaction = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const newTransaction = await addTransactionService({ ...req.body, userId: req.user?._id });
    return sendResponse(res, 201, {
      data: newTransaction,
      message: 'Add transaction successfully!'
    });
  } catch (error) {
    next(error);
  }
};
