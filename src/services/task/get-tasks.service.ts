import Task from '../../models/task.model.js';

export const getTasksService = async (userID: string) => {
  const tasks = await Task.find({ user: userID });
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (let task of tasks) {
    if (task.dueDate) {
      const taskDueDate = new Date(task.dueDate);
      taskDueDate.setHours(0, 0, 0, 0);

      if (taskDueDate < currentDate && task.status === 'pending') {
        task.status = 'overdue';
        await task.save();
      }
    }
  }
  return tasks;
};
