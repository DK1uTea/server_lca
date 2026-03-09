import mongoose from 'mongoose';

export const getHabitLogSeeds = (habits: any[]) => {
  const logs: any[] = [];
  const today = new Date();

  habits.forEach((habit, index) => {
    // Generate some logs for each habit to create streaks
    const numLogs = 3 + (index % 5); // 3-7 logs
    for (let i = 0; i < numLogs; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);

      logs.push({
        habitId: habit._id,
        userId: habit.userId,
        date: date,
        createdAt: new Date(),
      });
    }
  });

  return logs;
};
