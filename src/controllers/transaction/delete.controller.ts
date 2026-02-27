import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { deleteTransactionService } from '../../services/transaction/delete.service.js';

import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const deleteTransaction = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const transactionID = req.params.id as string;
  try {
    const deletedTransaction = await deleteTransactionService(transactionID, req.user?._id as string);
    if (!deletedTransaction) {
      return sendResponse(res, 404, { data: null, message: 'Transaction not found!' });
    }
    return sendResponse(res, 200, { data: null, message: `Transaction deleted successfully!` });
  } catch (error) {
    next(error);
  }
};
