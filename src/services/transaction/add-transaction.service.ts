import Transaction from '../../models/transaction.model.js';
import { AddTransactionReq } from '../../controllers/transaction/add-transaction.controller.js';

export const addTransactionService = async (transactionData: AddTransactionReq, userId: string) => {
  const newTransaction = new Transaction({ ...transactionData, userId });
  await newTransaction.save();
  return newTransaction.toObject();
};
