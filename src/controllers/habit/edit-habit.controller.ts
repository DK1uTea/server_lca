import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { editHabitService } from '../../services/habit/edit-habit.service.js';

import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const editHabit = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const habitID = req.params.id as string;
  try {
    const updatedHabit = await editHabitService(habitID, req.user?._id as string, req.body);
    if (!updatedHabit) return sendResponse(res, 404, { data: null, message: 'Habit not found!' });
    return sendResponse(res, 200, {
      data: updatedHabit,
      message: 'Update habit successfully!'
    });
  } catch (error) {
    next(error);
  }
};
