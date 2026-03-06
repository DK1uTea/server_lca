import mongoose from 'mongoose';
import Habit from '../../models/habit.model.js';
import User from '../../models/user.model.js';
import { getPeriodRange, formatZonedDate } from '../../utils/date.util.js';
import { TZDate } from '@date-fns/tz';

export type GetHabitStatsQuery = {
  period: 'weekly' | 'monthly'
}

export const getHabitStatsService = async (
  userID: string,
  query: GetHabitStatsQuery
) => {
  const { period } = query;

  // Fetch user timezone
  const user = await User.findById(userID).select('timezone').lean();
  const timezone = user?.timezone || 'UTC';

  const now = new Date();
  const { startDate, endDate } = getPeriodRange(now, period, timezone);

  const habits = await Habit.find({
    userId: new mongoose.Types.ObjectId(userID)
  }).lean();

  const statsByDate = new Map<
    string,
    { completed: number; pending: number; total: number }
  >();

  // Initialize the map with all dates in the range
  let currentDate = new TZDate(startDate, timezone);
  while (currentDate < endDate) {
    const dateStr = formatZonedDate(currentDate, 'yyyy-MM-dd', timezone);
    statsByDate.set(dateStr, {
      completed: 0,
      pending: 0,
      total: habits.length
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  for (const habit of habits) {
    for (const completedDate of habit.completedDates) {
      // Treat completedDate as UTC and convert to user timezone for comparison
      const dateStr = formatZonedDate(completedDate, 'yyyy-MM-dd', timezone);
      if (statsByDate.has(dateStr)) {
        const stats = statsByDate.get(dateStr)!;
        stats.completed += 1;
      }
    }
  }

  // Calculate pending for each date
  statsByDate.forEach((stats) => {
    stats.pending = stats.total - stats.completed;
  });

  return Array.from(statsByDate.entries())
    .map(([date, stats]) => ({
      date,
      ...stats
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
};
