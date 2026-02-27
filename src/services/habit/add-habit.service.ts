import Habit from '../../models/habit.model.js';

export const addHabitService = async (habitData: any) => {
  const newHabit = new Habit(habitData);
  await newHabit.save();
  return newHabit;
};
