import { Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { getHabitsService } from '../../services/habit/get-habits.service.js';

import { AuthRequest } from '../../middlewares/auth.middleware.js';
import { PaginationType, SortType, SearchType } from '../../types/query_types.js';

export type GetHabitQuery = PaginationType & SortType & SearchType & {
  frequency?: string; // e.g. "daily,weekly,monthly"
}

export const getHabit = async (
  req: AuthRequest<any, any, any, GetHabitQuery>,
  res: Response, next: NextFunction) => {
  try {
    const habits = await getHabitsService(req.user?._id as string, req.query);
    return sendResponse(res, 200, {
      data: habits,
      message: 'Get habits successfully!'
    });
  } catch (error) {
    next(error);
  }
};
