import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { getHabitsService } from '../../services/habit/get-habits.service.js';

export const getHabit = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.params.userID as string;
  try {
    const habitCategories = await getHabitsService(userID);
    return sendResponse(res, 200, {
      data: habitCategories,
      message: 'Get habit successfully!'
    });
  } catch (error) {
    next(error);
  }
};
