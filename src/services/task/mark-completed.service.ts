import Task from '../../models/task.model.js';

export const markTaskAsCompletedService = async (taskId: string) => {
  const task = await Task.findById(taskId);
  if (!task) return null;

  if (task.status === 'pending' || task.status === 'overdue') {
    task.status = 'completed';
    task.completedDate = new Date();
    await task.save();
  }
  return task;
};
