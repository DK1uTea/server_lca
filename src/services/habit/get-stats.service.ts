import Habit from '../../models/habit.model.js';
import { isSameDay, isSameWeek, isSameMonth, differenceInDays } from 'date-fns';

export const getHabitStatsService = async (userID: string) => {
  const habits = await Habit.find({ user: userID });
  if (!habits.length) return [];

  const today = new Date();
  return habits.map(habit => {
    const { name, frequency, targetCount, completedDates, createdAt } = habit;

    let completionRate = 0;
    const completedCount = completedDates.filter(date => {
      const completedDate = new Date(date);
      if (frequency === 'daily') {
        return isSameDay(completedDate, today);
      } else if (frequency === 'weekly') {
        return isSameWeek(completedDate, today, { weekStartsOn: 1 });
      } else if (frequency === 'monthly') {
        return isSameMonth(completedDate, today);
      }
      return false;
    }).length;

    if (frequency === 'daily') {
      const daysElapsed = differenceInDays(today, new Date(createdAt)) + 1;
      completionRate = (completedCount / daysElapsed) * 100;
    } else {
      completionRate = (completedCount / targetCount) * 100;
    }

    return {
      habitName: name,
      frequency,
      completionRate: Math.min(completionRate, 100),
    };
  });
};
