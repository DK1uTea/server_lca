import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { deleteTransactionService } from '../../services/transaction/delete.service.js';

export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
  const transactionID = req.params.id as string;
  try {
    const deletedTransaction = await deleteTransactionService(transactionID);
    if (!deletedTransaction) {
      return sendResponse(res, 404, { data: null, message: 'Transaction not found!' });
    }
    return sendResponse(res, 200, { data: null, message: `Transaction deleted successfully!` });
  } catch (error) {
    next(error);
  }
};
