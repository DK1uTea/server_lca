import { GetTaskParams, GetTaskQuery } from '../../controllers/task/get-task.controller.js';
import Task from '../../models/task.model.js';
import User from '../../models/user.model.js';
import { getPaginationObject } from '../../utils/resPagination.util.js';
import { getZonedStartOfDay } from '../../utils/date.util.js';

export const getTasksService = async (userID: string, query: GetTaskQuery) => {
  const { search, page, limit, sort, sortBy, priority, status } = query;

  // Fetch user timezone for accurate overdue calculation
  const user = await User.findById(userID).select('timezone').lean();
  const timezone = user?.timezone || 'UTC';

  const now = new Date();
  const startOfToday = getZonedStartOfDay(now, timezone);

  // Update overdue tasks for this user before fetching
  // A task is overdue if its dueDate is before the start of today in the user's timezone
  await Task.updateMany(
    {
      userId: userID,
      dueDate: { $lt: startOfToday },
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
    .limit(limitNum)
    .lean();

  const total = await Task.countDocuments(searchQuery);

  const pagination = getPaginationObject(pageNum, limitNum, total);

  return {
    tasks,
    ...pagination
  };
};
