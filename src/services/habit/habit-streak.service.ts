import Habit from '../../models/habit.model.js';
import { differenceInDays } from 'date-fns';
import { getZonedStartOfDay } from '../../utils/date.util.js';

export const updateHabitStreak = async (habitId: string, timezone: string = 'UTC') => {
  const habit = await Habit.findById(habitId);
  if (!habit) return;

  const now = new Date();
  const todayZoned = getZonedStartOfDay(now, timezone);
  const lastCompletedDate = habit.streak?.lastCompletedDate;

  if (!lastCompletedDate) {
    // First time completing the habit
    habit.streak.current = 1;
  } else {
    const lastCompletedZoned = getZonedStartOfDay(lastCompletedDate, timezone);
    const diff = differenceInDays(todayZoned, lastCompletedZoned);

    if (diff === 1) {
      // Completed on consecutive days
      habit.streak.current += 1;
    } else if (diff > 1) {
      // Streak broken
      habit.streak.current = 1;
    }
    // If diff === 0, it's already updated or being re-marked (no-op for current)
  }

  habit.streak.lastCompletedDate = now;

  if (habit.streak.current > habit.streak.longest) {
    habit.streak.longest = habit.streak.current;
  }

  await habit.save();
};