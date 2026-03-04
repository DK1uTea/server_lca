import mongoose from 'mongoose';
import {
  format,
  startOfWeek,
  startOfMonth,
  addWeeks,
  addMonths
} from 'date-fns';

import Transaction from '../../models/transaction.model.js';

export type GetTransactionStatsQuery = {
  period: 'weekly' | 'monthly'
}

export const getConsumptionStatsService = async (
  userID: string,
  query: GetTransactionStatsQuery
) => {
  const { period } = query;
  const now = new Date();

  let startDate: Date;
  let endDate: Date;

  switch (period) {
    case 'weekly': {
      startDate = startOfWeek(now, { weekStartsOn: 1 }); // Monday
      endDate = addWeeks(startDate, 1);
      break;
    }

    case 'monthly': {
      startDate = startOfMonth(now);
      endDate = addMonths(startDate, 1);
      break;
    }

    default: {
      startDate = startOfWeek(now, { weekStartsOn: 1 });
      endDate = addWeeks(startDate, 1);
      break;
    }
  }

  const transactions = await Transaction.find({
    userId: new mongoose.Types.ObjectId(userID),
    createdAt: { $gte: startDate, $lt: endDate }
  }).lean();

  const statsByDate = new Map<
    string,
    { income: number; expense: number; total: number }
  >();

  // Initialize the map with all dates in the range
  let currentDate = new Date(startDate);
  while (currentDate < endDate) {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    statsByDate.set(dateStr, {
      income: 0,
      expense: 0,
      total: 0
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  for (const tx of transactions) {
    const dateStr = format(tx.createdAt, 'yyyy-MM-dd');
    if (statsByDate.has(dateStr)) {
      const stats = statsByDate.get(dateStr)!;
      if (tx.type === 'income') {
        stats.income += tx.amount;
      } else {
        stats.expense += tx.amount;
      }
      stats.total = stats.income - stats.expense; // Net total or sum? Taking net as it's common for balance.
    }
  }

  return Array.from(statsByDate.entries())
    .map(([date, stats]) => ({
      date,
      ...stats
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
};
