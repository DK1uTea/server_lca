import Habit from '../../models/habit.model.js';

export const getHabitsService = async (userID: string) => {
  const habits = await Habit.find({ user: userID });

  interface HabitCategories {
    dailyHabits: any[];
    weeklyHabits: any[];
    monthlyHabits: any[];
    [key: string]: any[];
  }

  return habits.reduce((acc: HabitCategories, habit) => {
    acc[`${habit.frequency}Habits`].push(habit);
    return acc;
  }, { dailyHabits: [], weeklyHabits: [], monthlyHabits: [] });
};
