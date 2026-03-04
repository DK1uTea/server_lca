import mongoose from 'mongoose';
import {
  format,
  startOfWeek,
  startOfMonth,
  addWeeks,
  addMonths,
  isSameDay
} from 'date-fns';

import Habit from '../../models/habit.model.js';

export type GetHabitStatsQuery = {
  period: 'weekly' | 'monthly'
}

export const getHabitStatsService = async (
  userID: string,
  query: GetHabitStatsQuery
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

  const habits = await Habit.find({
    userId: new mongoose.Types.ObjectId(userID)
  }).lean();

  const statsByDate = new Map<
    string,
    { completed: number; pending: number; total: number }
  >();

  // Initialize the map with all dates in the range
  let currentDate = new Date(startDate);
  while (currentDate < endDate) {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    statsByDate.set(dateStr, {
      completed: 0,
      pending: 0,
      total: habits.length
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  for (const habit of habits) {
    for (const completedDate of habit.completedDates) {
      const dateStr = format(new Date(completedDate), 'yyyy-MM-dd');
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
