import mongoose from 'mongoose';
import Task from '../../models/task.model.js';

export const getTaskStatsService = async (userID: string) => {
  const stats = await Task.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userID) } },
    {
      $group: {
        _id: {
          day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          status: "$status"
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id.day": 1 } }
  ]);

  interface DailyStat {
    pending: number;
    completed: number;
    overdue: number;
    [key: string]: number;
  }

  return stats.reduce((acc: Record<string, DailyStat>, curr) => {
    const day = curr._id.day;
    const status = curr._id.status as string;

    if (!acc[day]) {
      acc[day] = { pending: 0, completed: 0, overdue: 0 };
    }

    acc[day][status] = curr.count;
    return acc;
  }, {});
};
