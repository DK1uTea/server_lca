import mongoose from 'mongoose';
import Transaction from '../../models/transaction.model.js';

export const getConsumptionStatsService = async (userID: string) => {
  const currentYear = new Date().getFullYear();
  const startYear = new Date(currentYear, 0, 1);
  const endYear = new Date(currentYear, 11, 31, 23, 59, 59);

  const categoryStats = await Transaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userID) } },
    {
      $group: {
        _id: { type: '$type', category: '$category' },
        totalAmount: { $sum: '$amount' },
      },
    },
  ]);

  const monthlyStats = await Transaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userID), createdAt: { $gte: startYear, $lte: endYear } } },
    {
      $group: {
        _id: {
          month: { $month: '$createdAt' },
          type: '$type',
        },
        totalAmount: { $sum: '$amount' },
      },
    },
    { $sort: { '_id.month': 1 } },
  ]);

  interface CategoryData {
    [type: string]: {
      [category: string]: number;
    };
  }

  const categoryData = categoryStats.reduce((acc: CategoryData, curr) => {
    const { type, category } = curr._id;
    if (!acc[type]) acc[type] = {};
    acc[type][category] = curr.totalAmount;
    return acc;
  }, {});

  interface MonthlyStat {
    month: number;
    income: number;
    expense: number;
  }

  const monthlyData: MonthlyStat[] = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    income: 0,
    expense: 0,
  }));

  monthlyStats.forEach((stat) => {
    const { month, type } = stat._id;
    if (type === 'Income') {
      monthlyData[month - 1].income = stat.totalAmount;
    } else {
      monthlyData[month - 1].expense = stat.totalAmount;
    }
  });

  return { categoryData, monthlyData };
};
