import Transaction from '../../models/transaction.model.js';

export const addTransactionService = async (transactionData: any) => {
  const newTransaction = new Transaction(transactionData);
  await newTransaction.save();
  return newTransaction;
};
