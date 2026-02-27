import Transaction from '../../models/transaction.model.js';

export const editTransactionService = async (id: string, userId: string, updateData: any) => {
  return await Transaction.findOneAndUpdate({ _id: id, userId }, updateData, { new: true });
};
