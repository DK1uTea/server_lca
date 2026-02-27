import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { markHabitAsCompletedService } from '../../services/habit/mark-completed.service.js';

export const markHabitAsCompleted = async (req: Request, res: Response, next: NextFunction) => {
  const habitId = req.params.id as string;
  const { date } = req.body;
  try {
    const habit = await markHabitAsCompletedService(habitId, date);
    if (!habit) return sendResponse(res, 404, { data: null, message: 'Habit not found!' });
    return sendResponse(res, 200, { data: habit, message: 'Mark habit as completed successfully!' });
  } catch (error) {
    next(error);
  }
};
