import Habit from '../../models/habit.model.js';

export const markHabitAsCompletedService = async (id: string, date: string) => {
  const habit = await Habit.findById(id);
  if (!habit) return null;

  const completedDates = habit.completedDates.map(d => d.toISOString().split('T')[0]);
  if (!completedDates.includes(date)) {
    habit.completedDates.push(new Date(date));
    await habit.save();
  }
  return habit;
};
