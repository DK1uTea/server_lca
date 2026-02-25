import { Request, Response, NextFunction } from 'express';
import Habit from '../models/habit.model.js';
import { isSameDay, isSameWeek, isSameMonth, differenceInDays } from 'date-fns';

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
    return res.status(201).json({
      message: 'Add habit successfully!',
      habit: newHabit
    })
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

    return res.status(200).json({
      message: 'Get habit successfully!',
      ...habitCategories
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHabit = async (req: Request, res: Response, next: NextFunction) => {
  const habitID = req.params.id;

  try {
    const deletedHabit = await Habit.findByIdAndDelete(habitID);
    if (!deletedHabit) return res.status(404).json({ message: 'Habit not found!' });
    return res.status(200).json({ message: 'Habit deleted successfully!' });
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
    if (!updatedHabit) return res.status(404).json({ message: 'Habit not found!' });
    return res.status(200).json({
      message: 'Update habit successfully!',
      updatedHabit: updatedHabit
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
      return res.status(404).json({ message: 'Habit not found!' });
    }

    const completedDates = habit.completedDates.map(d => d.toISOString().split('T')[0]);
    if (!completedDates.includes(date)) {
      habit.completedDates.push(new Date(date));
      await habit.save();
    }

    return res.status(200).json({ updatedHabit: habit });
  } catch (error) {
    next(error);
  }
};

export const getHabitCompletionStatistic = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.params.userID;
  try {
    const habits = await Habit.find({ user: userID });
    if (!habits.length) {
      return res.json([]);
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
    return res.json(stats);
  } catch (error) {
    next(error);
  }
};
