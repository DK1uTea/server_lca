import type { Connection } from 'mongoose';
import { Schema } from 'mongoose';

export async function up(connection: Connection): Promise<void> {
  const habits = connection.collection('habits');
  const habitLogs = connection.collection('habitlogs');

  const allHabits = await habits.find({}).toArray();

  for (const habit of allHabits) {
    const completedDates: Date[] = habit.completedDates || [];
    const habitId = habit._id;
    const userId = habit.userId;

    if (completedDates.length > 0) {
      // 1. Create HabitLog entries
      const logs = completedDates.map(date => ({
        habitId,
        userId,
        date: new Date(date),
        createdAt: new Date(),
      }));

      // Use insertMany but handle potential duplicates if migration is re-run (though id shouldn't match)
      // Actually, since we're deleting completedDates, it's safer to just insert
      if (logs.length > 0) {
        try {
          await habitLogs.insertMany(logs);
        } catch (e) {
          console.error(`Failed to insert logs for habit ${habitId}:`, e);
        }
      }

      // 2. Calculate Streak
      // Sort dates descending
      const sortedDates = [...completedDates].sort((a, b) => b.getTime() - a.getTime());
      const lastCompletedDate = sortedDates[0];

      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;

      // Simple daily streak calculation for migration
      // For more complex frequencies (weekly/monthly), this might need adjustment
      // but usually streaks are daily.

      const uniqueDates = Array.from(new Set(completedDates.map(d => new Date(d).toDateString())))
        .map(s => new Date(s))
        .sort((a, b) => a.getTime() - b.getTime());

      if (uniqueDates.length > 0) {
        tempStreak = 1;
        longestStreak = 1;
        for (let i = 1; i < uniqueDates.length; i++) {
          const diffTime = Math.abs(uniqueDates[i].getTime() - uniqueDates[i - 1].getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            tempStreak++;
          } else {
            tempStreak = 1;
          }
          if (tempStreak > longestStreak) longestStreak = tempStreak;
        }

        // Current streak: check if last completion was today or yesterday
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastDate = new Date(lastCompletedDate);
        lastDate.setHours(0, 0, 0, 0);

        const diffToToday = Math.ceil((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffToToday <= 1) {
          // Find current streak by counting backwards from last completion
          let currentCount = 1;
          for (let i = uniqueDates.length - 2; i >= 0; i--) {
            const diff = Math.ceil((uniqueDates[i + 1].getTime() - uniqueDates[i].getTime()) / (1000 * 60 * 60 * 24));
            if (diff === 1) {
              currentCount++;
            } else {
              break;
            }
          }
          currentStreak = currentCount;
        } else {
          currentStreak = 0;
        }
      }

      await habits.updateOne(
        { _id: habitId },
        {
          $set: {
            streak: {
              current: currentStreak,
              longest: longestStreak,
              lastCompletedDate: lastCompletedDate
            }
          },
          $unset: { completedDates: "" }
        }
      );
    } else {
      // No completed dates, just initialize streak
      await habits.updateOne(
        { _id: habitId },
        {
          $set: {
            streak: {
              current: 0,
              longest: 0,
              lastCompletedDate: null
            }
          },
          $unset: { completedDates: "" }
        }
      );
    }
  }
}

export async function down(connection: Connection): Promise<void> {
  const habits = connection.collection('habits');
  const habitLogs = connection.collection('habitlogs');

  const allHabits = await habits.find({}).toArray();

  for (const habit of allHabits) {
    const habitId = habit._id;
    const logs = await habitLogs.find({ habitId }).toArray();
    const completedDates = logs.map(log => log.date);

    await habits.updateOne(
      { _id: habitId },
      {
        $set: { completedDates },
        $unset: { streak: "" }
      }
    );
  }

  // Optionally keep logs but the prompt implies clearing or just reverting the field
  // To be safe, we don't delete logs globally, just revert the field.
}
