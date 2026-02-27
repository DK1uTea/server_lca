import Transaction from '../../models/transaction.model.js';

export const editTransactionService = async (id: string, updateData: any) => {
  return await Transaction.findByIdAndUpdate(id, updateData, { new: true });
};
