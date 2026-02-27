import Task from '../../models/task.model.js';

export const deleteTaskService = async (taskId: string, userId: string) => {
  return await Task.findOneAndDelete({ _id: taskId, userId });
};
