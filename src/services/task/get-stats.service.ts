import mongoose from 'mongoose';
import {
  format,
  startOfWeek,
  startOfMonth,
  addWeeks,
  addMonths,
  isBefore
} from 'date-fns';

import Task from '../../models/task.model.js';
import { GetTaskStatsQuery } from '../../controllers/task/get-stats.controller.js';

export const getTaskStatsService = async (
  userID: string,
  query: GetTaskStatsQuery
) => {
  const { period } = query;
  const now = new Date();

  let startDate: Date;
  let endDate: Date | null = null;

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

  const dateFilter: any = { $gte: startDate };

  if (endDate) {
    dateFilter.$lt = endDate;
  }

  const tasks = await Task.find({
    userID: new mongoose.Types.ObjectId(userID),
    createdAt: dateFilter
  }).lean();

  const statsByDate = new Map<
    string,
    { pending: number; completed: number; overdue: number }
  >();

  for (const task of tasks) {
    const dateStr = format(task.createdAt, 'yyyy-MM-dd');

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