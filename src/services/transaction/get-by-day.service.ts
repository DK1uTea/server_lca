import Transaction from '../../models/transaction.model.js';

export const getTransactionsByDayService = async (userID: string, day: string) => {
  const startOfDay = new Date(day);
  const endOfDay = new Date(day);
  endOfDay.setHours(23, 59, 59, 999);

  return await Transaction.find({
    user: userID,
    createdAt: {
      $gte: startOfDay,
      $lt: endOfDay
    }
  });
};
