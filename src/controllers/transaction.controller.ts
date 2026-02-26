import { Request, Response, NextFunction } from 'express';
import Transaction from "../models/transaction.model.js";
import mongoose from "mongoose";
import { sendResponse } from '../utils/response.util.js';

// add transaction to DB
export const addTransaction = async (req: Request, res: Response, next: NextFunction) => {
  const { user, type, category, amount, description } = req.body;

  try {
    const newTransaction = new Transaction({
      user,
      type,
      category,
      amount,
      description
    });
    await newTransaction.save();
    return sendResponse(res, 201, {
      data: newTransaction,
      message: 'Add transaction successfully!'
    });

  } catch (error) {
    next(error);
  }
};

// get transaction by day from DB
export const getTransactionByDay = async (req: Request, res: Response, next: NextFunction) => {
  const { userID, day } = req.query;

  if (!userID || !day) {
    return sendResponse(res, 400, { data: null, message: "userID and day are required query parameters" });
  }

  try {
    const startOfDay = new Date(day as string);
    const endOfDay = new Date(day as string);
    endOfDay.setHours(23, 59, 59, 999);

    const transactions = await Transaction.find({
      user: userID,
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    return sendResponse(res, 200, {
      data: transactions,
      message: 'Transactions retrieved successfully!'
    });

  } catch (error) {
    next(error);
  }
};

// find transaction by id and delete from DB
export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
  const transactionID = req.params.id;

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(transactionID);
    if (!deletedTransaction) {
      return sendResponse(res, 404, { data: null, message: 'Transaction not found!' });
    }
    return sendResponse(res, 200, { data: null, message: `Transaction deleted successfully!` });
  } catch (error) {
    next(error);
  }
};

// find transaction by id and edit it then save to DB
export const editTransaction = async (req: Request, res: Response, next: NextFunction) => {
  const transactionID = req.params.id;
  const { type, category, amount, description } = req.body;
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionID,
      { type, category, amount, description },
      { new: true }
    );
    if (!updatedTransaction) {
      return sendResponse(res, 404, { data: null, message: 'Transaction not found' });
    }
    return sendResponse(res, 200, { data: updatedTransaction, message: 'Update transaction successfully!' });
  } catch (error) {
    next(error);
  }
};

export const getConsumptionStatistics = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.params.userID;
  try {
    const currentYear = new Date().getFullYear();
    const startYear = new Date(currentYear, 0, 1);
    const endYear = new Date(currentYear, 11, 31, 23, 59, 59);

    const categoryStats = await Transaction.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userID as string) } },
      {
        $group: {
          _id: { type: '$type', category: '$category' },
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    const monthlyStats = await Transaction.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userID as string), createdAt: { $gte: startYear, $lte: endYear } } },
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

    return sendResponse(res, 200, { data: { categoryData, monthlyData }, message: 'Get consumption statistics successfully!' });
  } catch (error) {
    next(error);
  }
};
