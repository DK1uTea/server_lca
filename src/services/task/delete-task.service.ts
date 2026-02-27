import Task from '../../models/task.model.js';

export const deleteTaskService = async (taskId: string) => {
  return await Task.findByIdAndDelete(taskId);
};
