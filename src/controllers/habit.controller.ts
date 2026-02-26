import { Request, Response, NextFunction } from 'express';
import Habit from '../models/habit.model.js';
import { isSameDay, isSameWeek, isSameMonth, differenceInDays } from 'date-fns';
import { sendResponse } from '../utils/response.util.js';

export const addHabit = async (req: Request, res: Response, next: NextFunction) => {
  const { user, name, description, frequency, targetCount } = req.body;

  try {
    const newHabit = new Habit({
      user,
      name,
      description,
      frequency,
      targetCount
    });
    await newHabit.save();
    return sendResponse(res, 201, {
      data: newHabit,
      message: 'Add habit successfully!'
    });
  } catch (error) {
    next(error);
  }
};

export const getHabit = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.params.userID;
  try {
    const habits = await Habit.find({ user: userID });

    interface HabitCategories {
      dailyHabits: any[];
      weeklyHabits: any[];
      monthlyHabits: any[];
      [key: string]: any[];
    }

    const habitCategories = habits.reduce((acc: HabitCategories, habit) => {
      acc[`${habit.frequency}Habits`].push(habit);
      return acc;
    }, { dailyHabits: [], weeklyHabits: [], monthlyHabits: [] });

    return sendResponse(res, 200, {
      data: habitCategories,
      message: 'Get habit successfully!'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHabit = async (req: Request, res: Response, next: NextFunction) => {
  const habitID = req.params.id;

  try {
    const deletedHabit = await Habit.findByIdAndDelete(habitID);
    if (!deletedHabit) return sendResponse(res, 404, { data: null, message: 'Habit not found!' });
    return sendResponse(res, 200, { data: null, message: 'Habit deleted successfully!' });
  } catch (error) {
    next(error);
  }
};

export const editHabit = async (req: Request, res: Response, next: NextFunction) => {
  const habitID = req.params.id;
  const { name, description, frequency, targetCount } = req.body;

  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      habitID,
      { name, description, frequency, targetCount },
      { new: true }
    );
    if (!updatedHabit) return sendResponse(res, 404, { data: null, message: 'Habit not found!' });
    return sendResponse(res, 200, {
      data: updatedHabit,
      message: 'Update habit successfully!'
    });
  } catch (error) {
    next(error);
  }
};

export const markHabitAsCompleted = async (req: Request, res: Response, next: NextFunction) => {
  const habitId = req.params.id;
  const { date } = req.body;

  try {
    const habit = await Habit.findById(habitId);
    if (!habit) {
      return sendResponse(res, 404, { data: null, message: 'Habit not found!' });
    }

    const completedDates = habit.completedDates.map(d => d.toISOString().split('T')[0]);
    if (!completedDates.includes(date)) {
      habit.completedDates.push(new Date(date));
      await habit.save();
    }

    return sendResponse(res, 200, { data: habit, message: 'Mark habit as completed successfully!' });
  } catch (error) {
    next(error);
  }
};

export const getHabitCompletionStatistic = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.params.userID;
  try {
    const habits = await Habit.find({ user: userID });
    if (!habits.length) {
      return sendResponse(res, 200, { data: [], message: 'No habits found' });
    }

    const today = new Date();
    const stats = habits.map(habit => {
      const { name, frequency, targetCount, completedDates, createdAt } = habit;

      let completionRate = 0;
      const completedCount = completedDates.filter(date => {
        const completedDate = new Date(date);
        if (frequency === 'daily') {
          return isSameDay(completedDate, today);
        } else if (frequency === 'weekly') {
          return isSameWeek(completedDate, today, { weekStartsOn: 1 });
        } else if (frequency === 'monthly') {
          return isSameMonth(completedDate, today);
        }
        return false;
      }).length;

      if (frequency === 'daily') {
        const daysElapsed = differenceInDays(today, new Date(createdAt)) + 1;
        completionRate = (completedCount / daysElapsed) * 100;
      } else {
        completionRate = (completedCount / targetCount) * 100;
      }

      return {
        habitName: name,
        frequency,
        completionRate: Math.min(completionRate, 100),
      };
    });
    return sendResponse(res, 200, { data: stats, message: 'Get habit completion statistics successfully!' });
  } catch (error) {
    next(error);
  }
};
