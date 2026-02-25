import { Request, Response, NextFunction } from 'express';
import Task from "../models/task.model.js";
import mongoose from 'mongoose';

// Add new task
export const addTask = async (req: Request, res: Response, next: NextFunction) => {
  const { user, title, description, dueDate, priority } = req.body;

  try {
    const newTask = new Task({
      user,
      title,
      description,
      dueDate,
      priority
    });
    await newTask.save();
    return res.status(201).json({
      message: 'Task added successfully!',
      task: newTask
    });
  } catch (error) {
    next(error);
  }
};

// Get all task follow by user id
export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.params.userID;

  try {
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

    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Edit task by ID
export const editTask = async (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.id;
  const { title, description, dueDate, priority } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, dueDate, priority },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json({ message: 'Updated task successfully', updatedTask });
  } catch (error) {
    next(error);
  }
};

// Delete task by ID
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Mark task as completed
export const markTaskAsCompleted = async (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.status === 'pending' || task.status === 'overdue') {
      task.status = 'completed';
      task.completedDate = new Date();
      await task.save();
    }
    return res.status(200).json({ message: 'Task marked as completed', task });
  } catch (error) {
    next(error);
  }
};

// Get task completion statistics
export const getTaskCompletionStatistic = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.params.userID;

  try {
    const stats = await Task.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userID as string) } },
      {
        $group: {
          _id: {
            day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            status: "$status"
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.day": 1 } }
    ]);

    interface DailyStat {
      pending: number;
      completed: number;
      overdue: number;
      [key: string]: number;
    }

    const result = stats.reduce((acc: Record<string, DailyStat>, curr) => {
      const day = curr._id.day;
      const status = curr._id.status as string;

      if (!acc[day]) {
        acc[day] = { pending: 0, completed: 0, overdue: 0 };
      }

      acc[day][status] = curr.count;
      return acc;
    }, {});

    res.json(result);
  } catch (error) {
    next(error);
  }
};
