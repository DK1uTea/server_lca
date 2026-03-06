import Transaction from '../../models/transaction.model.js';
import User from '../../models/user.model.js';
import { getPaginationObject } from '../../utils/resPagination.util.js';
import { getZonedStartOfDay, getZonedEndOfDay } from '../../utils/date.util.js';
import { getTransactionsQuery } from '../../controllers/transaction/get-transactions.controller.js';

export const getTransactionsService = async (userID: string, query: getTransactionsQuery) => {
  const { page, limit, type, createdDate } = query;

  const searchQuery: any = { userId: userID };

  if (type) {
    searchQuery.type = type;
  }

  if (createdDate) {
    // Fetch user timezone
    const user = await User.findById(userID).select('timezone').lean();
    const timezone = user?.timezone || 'UTC';

    const startOfDay = getZonedStartOfDay(createdDate, timezone);
    const endOfDay = getZonedEndOfDay(createdDate, timezone);

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
