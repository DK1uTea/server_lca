import { get } from 'node:http';
import { GetTaskParams, GetTaskQuery } from '../../controllers/task/get-task.controller.js';
import Task from '../../models/task.model.js';
import { getPaginationObject } from '../../utils/resPagination.util.js';

export const getTasksService = async (userID: string, query: GetTaskQuery) => {
  const { search, page, limit, sort, sortBy, priority, status } = query;
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Update overdue tasks for this user before fetching
  await Task.updateMany(
    {
      userId: userID,
      dueDate: { $lt: currentDate },
      status: 'pending'
    },
    { status: 'overdue' }
  );

  const searchQuery: any = { userId: userID };

  // 1. Search by title
  if (search) {
    searchQuery.title = { $regex: search, $options: 'i' };
  }

  // 2. Filter by priority and status
  if (priority) {
    searchQuery.priority = { $in: priority.split(',') };
  }
  if (status) {
    searchQuery.status = { $in: status.split(',') };
  }

  // 3. Sorting logic
  const validSortFields = ['title', 'dueDate', 'completedDate', 'createdAt'];
  const sortField = validSortFields.includes(sortBy || '') ? sortBy : 'createdAt';
  const sortOrder = sort === 'asc' ? 1 : -1;

  // 4. Pagination
  const pageNum = page || 1;
  const limitNum = limit || 10;
  const skip = (pageNum - 1) * limitNum;

  const tasks = await Task.find(searchQuery)
    .sort({ [sortField as string]: sortOrder })
    .skip(skip)
    .limit(limitNum);

  const total = await Task.countDocuments(searchQuery);

  const pagination = getPaginationObject(pageNum, limitNum, total);

  return {
    tasks,
    ...pagination
  };
};
