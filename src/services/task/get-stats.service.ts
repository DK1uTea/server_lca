import mongoose from 'mongoose';
import { isBefore } from 'date-fns';

import Task from '../../models/task.model.js';
import User from '../../models/user.model.js';
import { GetTaskStatsQuery } from '../../controllers/task/get-stats.controller.js';
import { getPeriodRange, formatZonedDate } from '../../utils/date.util.js';

export const getTaskStatsService = async (
  userID: string,
  query: GetTaskStatsQuery
) => {
  const { period } = query;

  // Fetch user timezone
  const user = await User.findById(userID).select('timezone').lean();
  const timezone = user?.timezone || 'UTC';

  const now = new Date();
  const { startDate, endDate } = getPeriodRange(now, period, timezone);


  const tasks = await Task.find({
    userId: new mongoose.Types.ObjectId(userID),
    createdAt: { $gte: startDate, $lt: endDate }
  }).lean();

  const statsByDate = new Map<
    string,
    { pending: number; completed: number; overdue: number }
  >();

  // Optional: Pre-fill the map with all dates in range?
  // For tasks it wasn't done before, so I'll keep the current behavior but fix the timezone grouping.

  for (const task of tasks) {
    const dateStr = formatZonedDate(task.createdAt, 'yyyy-MM-dd', timezone);

    if (!statsByDate.has(dateStr)) {
      statsByDate.set(dateStr, {
        pending: 0,
        completed: 0,
        overdue: 0
      });
    }

    const stats = statsByDate.get(dateStr)!;

    if (task.status === 'completed') {
      stats.completed += 1;
    } else if (task.dueDate && isBefore(new Date(task.dueDate), now)) {
      stats.overdue += 1;
    } else {
      stats.pending += 1;
    }
  }

  return Array.from(statsByDate.entries())
    .map(([date, stats]) => ({
      date,
      ...stats,
      total: stats.pending + stats.completed + stats.overdue
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
};