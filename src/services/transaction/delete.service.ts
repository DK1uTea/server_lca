import Transaction from '../../models/transaction.model.js';

export const deleteTransactionService = async (id: string) => {
  return await Transaction.findByIdAndDelete(id);
};
