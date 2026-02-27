import { get } from 'node:http';
import { getTransactionsQuery } from '../../controllers/transaction/get-transactions.controller.js';
import Transaction from '../../models/transaction.model.js';
import { getPaginationObject } from '../../utils/resPagination.util.js';

export const getTransactionsService = async (userID: string, query: getTransactionsQuery) => {
  const { page, limit, type, createdDate } = query;

  const searchQuery: any = { userId: userID };

  if (type) {
    searchQuery.type = type;
  }

  if (createdDate) {
    const date = new Date(createdDate);

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    searchQuery.createdAt = {
      $gte: startOfDay,
      $lte: endOfDay
    };
  }

  const pageNum = page || 1;
  const limitNum = limit || 10;
  const skip = (pageNum - 1) * limitNum;

  const transactions = await Transaction.find(searchQuery)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  const total = await Transaction.countDocuments(searchQuery);

  return {
    transactions,
    ...getPaginationObject(pageNum, limitNum, total)
  }
};
