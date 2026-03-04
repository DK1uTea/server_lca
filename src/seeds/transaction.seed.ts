import mongoose from 'mongoose';

export const getTransactionSeeds = (userIds: mongoose.Types.ObjectId[]) => [
  {
    userId: userIds[0],
    type: 'expense',
    category: 'Food',
    amount: 15.5,
    description: 'Lunch at Subway.',
  },
  {
    userId: userIds[1],
    type: 'income',
    category: 'Salary',
    amount: 2500,
    description: 'Monthly salary credit.',
  },
  {
    userId: userIds[2],
    type: 'expense',
    category: 'Transport',
    amount: 5.0,
    description: 'Bus fare.',
  },
  {
    userId: userIds[3],
    type: 'expense',
    category: 'Entertainment',
    amount: 12.0,
    description: 'Netflix subscription.',
  },
  {
    userId: userIds[4],
    type: 'income',
    category: 'Freelance',
    amount: 500,
    description: 'Logo design project.',
  },
  {
    userId: userIds[5],
    type: 'expense',
    category: 'Utilities',
    amount: 120.5,
    description: 'Electricity bill.',
  },
  {
    userId: userIds[6],
    type: 'expense',
    category: 'Shopping',
    amount: 45.0,
    description: 'New T-shirt.',
  },
  {
    userId: userIds[7],
    type: 'income',
    category: 'Investment',
    amount: 150,
    description: 'Dividend payment.',
  },
  {
    userId: userIds[8],
    type: 'expense',
    category: 'Health',
    amount: 30.0,
    description: 'Gym supplements.',
  },
  {
    userId: userIds[9],
    type: 'expense',
    category: 'Education',
    amount: 99.0,
    description: 'Online course enrollment.',
  },
];
