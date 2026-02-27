import Task from '../../models/task.model.js';

export const markTaskAsCompletedService = async (taskId: string, userId: string) => {
  const task = await Task.findOne({ _id: taskId, userId });
  if (!task) return null;

  if (task.status === 'pending' || task.status === 'overdue') {
    task.status = 'completed';
    task.completedDate = new Date();
    await task.save();
  }
  return task;
};
