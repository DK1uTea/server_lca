import { Request, Response, NextFunction } from 'express';
import Transaction from "../models/transaction.model.js";
import mongoose from "mongoose";

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
    return res.status(201).json({
      message: 'Add transaction successfully!',
      transaction: newTransaction
    });

  } catch (error) {
    next(error);
  }
};

// get transaction by day from DB
export const getTransactionByDay = async (req: Request, res: Response, next: NextFunction) => {
  const { userID, day } = req.query;

  if (!userID || !day) {
    return res.status(400).json({ message: "userID and day are required query parameters" });
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

    return res.status(200).json({
      message: 'Transactions retrieved successfully!',
      transactions: transactions
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
      return res.status(404).json({ message: 'Transaction not found!' });
    }
    return res.status(200).json({ message: `Transaction deleted successfully!` });
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
      return res.status(404).json({ message: 'Transaction not found' });
    }
    return res.status(200).json({ message: 'Update transaction successfully!', updatedTransaction });
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

    return res.json({ categoryData, monthlyData });
  } catch (error) {
    next(error);
  }
};
