import Task from '../../models/task.model.js';

export const editTaskService = async (taskId: string, updateData: any) => {
  return await Task.findByIdAndUpdate(taskId, updateData, { new: true });
};
