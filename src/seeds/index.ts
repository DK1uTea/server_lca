import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.config.js';
import User from '../models/user.model.js';
import Habit from '../models/habit.model.js';
import Task from '../models/task.model.js';
import Transaction from '../models/transaction.model.js';
import { userSeeds } from './user.seed.js';
import { getHabitSeeds } from './habit.seed.js';
import { getTaskSeeds } from './task.seed.js';
import { getTransactionSeeds } from './transaction.seed.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Habit.deleteMany({});
    await Task.deleteMany({});
    await Transaction.deleteMany({});
    console.log('Collections cleared.');

    console.log('Seeding Users...');
    const createdUsers = await User.insertMany(userSeeds);
    const userIds = createdUsers.map(user => user._id as mongoose.Types.ObjectId);
    console.log(`${createdUsers.length} users seeded.`);

    console.log('Seeding Habits...');
    const habitSeeds = getHabitSeeds(userIds);
    await Habit.insertMany(habitSeeds);
    console.log(`${habitSeeds.length} habits seeded.`);

    console.log('Seeding Tasks...');
    const taskSeeds = getTaskSeeds(userIds);
    await Task.insertMany(taskSeeds);
    console.log(`${taskSeeds.length} tasks seeded.`);

    console.log('Seeding Transactions...');
    const transactionSeeds = getTransactionSeeds(userIds);
    await Transaction.insertMany(transactionSeeds);
    console.log(`${transactionSeeds.length} transactions seeded.`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  }
};

seedDatabase();
