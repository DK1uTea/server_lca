import HabitLog from '../../models/habit-log.model.js';
import Habit from '../../models/habit.model.js';
import { getZonedStartOfDay } from '../../utils/date.util.js';
import { updateHabitStreak } from './habit-streak.service.js';

export const markHabitAsCompletedService = async (id: string, userId: string, timezone: string = 'UTC') => {
  const today = new Date();
  const startOfToday = getZonedStartOfDay(today, timezone);

  const habit = await Habit.findOne({ _id: id, userId });
  if (!habit) return null;

  const habitLog = await HabitLog.findOne({ habitId: id, date: startOfToday });
  if (habitLog) return "Habit already completed for today";

  const newHabitLog = new HabitLog({
    habitId: id,
    userId,
    date: startOfToday,
    createdAt: today,
  });
  await newHabitLog.save();

  // Update streak logic
  await updateHabitStreak(id, timezone);

  // Re-fetch habit to get updated streak in response
  const updatedHabit = await Habit.findById(id);

  return {
    habit: updatedHabit,
    newHabitLog
  };
};
