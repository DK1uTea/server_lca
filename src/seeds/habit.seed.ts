import mongoose from 'mongoose';

export const getHabitSeeds = (userIds: mongoose.Types.ObjectId[]) => [
  {
    userId: userIds[0],
    name: 'Drink Water',
    description: 'Drink at least 2 liters of water daily.',
    frequency: 'daily',
    targetCount: 1,
  },
  {
    userId: userIds[1],
    name: 'Morning Run',
    description: 'Go for a 5km run.',
    frequency: 'daily',
    targetCount: 1,
  },
  {
    userId: userIds[2],
    name: 'Read a Book',
    description: 'Read 20 pages of a book.',
    frequency: 'daily',
    targetCount: 1,
  },
  {
    userId: userIds[3],
    name: 'Meditation',
    description: '10 minutes of mindfulness.',
    frequency: 'daily',
    targetCount: 1,
  },
  {
    userId: userIds[4],
    name: 'Coding Practice',
    description: 'Solve one LeetCode problem.',
    frequency: 'daily',
    targetCount: 1,
  },
  {
    userId: userIds[5],
    name: 'Journaling',
    description: 'Write about your day.',
    frequency: 'daily',
    targetCount: 1,
  },
  {
    userId: userIds[6],
    name: 'Yoga',
    description: '30 minutes of yoga session.',
    frequency: 'weekly',
    targetCount: 3,
  },
  {
    userId: userIds[7],
    name: 'Cycling',
    description: 'Go cycling for an hour.',
    frequency: 'weekly',
    targetCount: 2,
  },
  {
    userId: userIds[8],
    name: 'Healthy Eating',
    description: 'No junk food today.',
    frequency: 'daily',
    targetCount: 1,
  },
  {
    userId: userIds[9],
    name: 'Learn a Language',
    description: '15 minutes on Duolingo.',
    frequency: 'daily',
    targetCount: 1,
  },
];
