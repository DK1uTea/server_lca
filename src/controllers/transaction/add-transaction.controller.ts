import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { addTransactionService } from '../../services/transaction/add-transaction.service.js';

export const addTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newTransaction = await addTransactionService(req.body);
    return sendResponse(res, 201, {
      data: newTransaction,
      message: 'Add transaction successfully!'
    });
  } catch (error) {
    next(error);
  }
};
