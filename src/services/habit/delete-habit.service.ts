import Habit from '../../models/habit.model.js';

export const deleteHabitService = async (id: string) => {
  return await Habit.findByIdAndDelete(id);
};
