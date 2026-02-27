import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { addHabitService } from '../../services/habit/add-habit.service.js';

export const addHabit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newHabit = await addHabitService(req.body);
    return sendResponse(res, 201, {
      data: newHabit,
      message: 'Add habit successfully!'
    });
  } catch (error) {
    next(error);
  }
};
