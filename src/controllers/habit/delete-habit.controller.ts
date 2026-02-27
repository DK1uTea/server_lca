import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { deleteHabitService } from '../../services/habit/delete-habit.service.js';

import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const deleteHabit = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const habitID = req.params.id as string;
  try {
    const deletedHabit = await deleteHabitService(habitID, req.user?._id as string);
    if (!deletedHabit) return sendResponse(res, 404, { data: null, message: 'Habit not found!' });
    return sendResponse(res, 200, { data: null, message: 'Habit deleted successfully!' });
  } catch (error) {
    next(error);
  }
};
