import mongoose from 'mongoose';
import Transaction from '../../models/transaction.model.js';
import User from '../../models/user.model.js';
import { getPeriodRange, formatZonedDate } from '../../utils/date.util.js';
import { TZDate } from '@date-fns/tz';

export type GetTransactionStatsQuery = {
  period: 'weekly' | 'monthly'
}

export const getConsumptionStatsService = async (
  userID: string,
  query: GetTransactionStatsQuery
) => {
  const { period } = query;

  // Fetch user timezone
  const user = await User.findById(userID).select('timezone').lean();
  const timezone = user?.timezone || 'UTC';

  const now = new Date();
  const { startDate, endDate } = getPeriodRange(now, period, timezone);

  const transactions = await Transaction.find({
    userId: new mongoose.Types.ObjectId(userID),
    createdAt: { $gte: startDate, $lt: endDate }
  }).lean();

  const statsByDate = new Map<
    string,
    { income: number; expense: number; total: number }
  >();

  // Initialize the map with all dates in the range
  let currentDate = new TZDate(startDate, timezone);
  while (currentDate < endDate) {
    const dateStr = formatZonedDate(currentDate, 'yyyy-MM-dd', timezone);
    statsByDate.set(dateStr, {
      income: 0,
      expense: 0,
      total: 0
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  for (const tx of transactions) {
    const dateStr = formatZonedDate(tx.createdAt, 'yyyy-MM-dd', timezone);
    if (statsByDate.has(dateStr)) {
      const stats = statsByDate.get(dateStr)!;
      if (tx.type === 'income') {
        stats.income += tx.amount;
      } else {
        stats.expense += tx.amount;
      }
      stats.total = stats.income - stats.expense;
    }
  }

  return Array.from(statsByDate.entries())
    .map(([date, stats]) => ({
      date,
      ...stats
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
};
