import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { editTransactionService } from '../../services/transaction/edit.service.js';

import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const editTransaction = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const transactionID = req.params.id as string;
  try {
    const updatedTransaction = await editTransactionService(transactionID, req.user?._id as string, req.body);
    if (!updatedTransaction) {
      return sendResponse(res, 404, { data: null, message: 'Transaction not found' });
    }
    return sendResponse(res, 200, { data: updatedTransaction, message: 'Update transaction successfully!' });
  } catch (error) {
    next(error);
  }
};
