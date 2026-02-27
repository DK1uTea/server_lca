import Habit from '../../models/habit.model.js';

export const editHabitService = async (id: string, userId: string, updateData: any) => {
  return await Habit.findOneAndUpdate({ _id: id, userId }, updateData, { new: true });
};
