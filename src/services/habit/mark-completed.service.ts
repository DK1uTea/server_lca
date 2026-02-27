import Habit from '../../models/habit.model.js';

export const markHabitAsCompletedService = async (id: string, userId: string, date: string) => {
  const habit = await Habit.findOne({ _id: id, userId });
  if (!habit) return null;

  const completedDates = habit.completedDates.map(d => d.toISOString().split('T')[0]);
  if (!completedDates.includes(date)) {
    habit.completedDates.push(new Date(date));
    await habit.save();
  }
  return habit;
};
