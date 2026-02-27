import Habit from '../../models/habit.model.js';

export const deleteHabitService = async (id: string, userId: string) => {
  return await Habit.findOneAndDelete({ _id: id, userId });
};
