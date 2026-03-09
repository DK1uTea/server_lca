import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { markHabitAsCompletedService } from '../../services/habit/mark-completed.service.js';

import { AuthRequest } from '../../middlewares/auth.middleware.js';


export const markHabitAsCompleted = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const habitId = req.params.id as string;
  try {
    const result = await markHabitAsCompletedService(habitId, req.user?._id as string, req.user?.timezone);
    if (!result) return sendResponse(res, 404, { data: null, message: 'Habit not found!' });
    if (result === "Habit already completed for today") return sendResponse(res, 409, { data: null, message: 'Habit already completed for today!' });
    return sendResponse(res, 200, { data: result.habit, message: 'Mark habit as completed successfully!' });
  } catch (error) {
    next(error);
  }
};
