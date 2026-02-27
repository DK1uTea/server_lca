import Task from '../../models/task.model.js';

export const editTaskService = async (taskId: string, userId: string, updateData: any) => {
  return await Task.findOneAndUpdate({ _id: taskId, userId }, updateData, { new: true });
};
