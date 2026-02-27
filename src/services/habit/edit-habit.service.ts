import Habit from '../../models/habit.model.js';

export const editHabitService = async (id: string, updateData: any) => {
  return await Habit.findByIdAndUpdate(id, updateData, { new: true });
};
