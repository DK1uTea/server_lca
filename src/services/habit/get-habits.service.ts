import { GetHabitQuery } from '../../controllers/habit/get-habit.controller.js';
import Habit from '../../models/habit.model.js';
import { getPaginationObject } from '../../utils/resPagination.util.js';

export const getHabitsService = async (userID: string, query: GetHabitQuery) => {
  const { search, page, limit, sort, sortBy, frequency } = query;

  const searchQuery: any = { userId: userID };

  // Title search
  if (search) {
    searchQuery.name = { $regex: search, $options: 'i' };
  }

  if (frequency) {
    searchQuery.frequency = { $in: frequency.split(',') };
  }

  // Sorting
  const validSortFields = ['name', 'createdAt'];
  const sortField = validSortFields.includes(sortBy || '') ? sortBy : 'createdAt';
  const sortOrder = sort === 'asc' ? 1 : -1;

  // Pagination
  const pageNum = page || 1;
  const limitNum = limit || 10;
  const skip = (pageNum - 1) * limitNum;

  const habits = await Habit.find(searchQuery)
    .sort({ [sortField as string]: sortOrder })
    .skip(skip)
    .limit(limitNum);

  const total = await Habit.countDocuments(searchQuery);
  const pagination = getPaginationObject(pageNum, limitNum, total);

  return {
    habits,
    ...pagination
  };
};
