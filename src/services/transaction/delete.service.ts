import Transaction from '../../models/transaction.model.js';

export const deleteTransactionService = async (id: string, userId: string) => {
  return await Transaction.findOneAndDelete({ _id: id, userId });
};
