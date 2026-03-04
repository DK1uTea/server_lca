import express from 'express';
import { getTask } from '../controllers/task/get-task.controller.js';
import { addTask } from '../controllers/task/add-task.controller.js';
import { editTask } from '../controllers/task/edit-task.controller.js';
import { deleteTask } from '../controllers/task/delete-task.controller.js';
import { markTaskAsCompleted } from '../controllers/task/mark-completed.controller.js';
import { getTaskCompletionStatistic } from '../controllers/task/get-stats.controller.js';

import { addTaskSchema, getTasksSchema } from '../validations/task.validation.js';
import { validate } from '../middlewares/validate.middleware.js';
import { getStatsSchema } from '../validations/query.validation.js';


const router = express.Router();

router.post('/', validate(addTaskSchema), addTask);
router.get('/', validate(getTasksSchema), getTask);
router.put('/:id', editTask);
router.delete('/:id', deleteTask);
router.patch('/:id/complete', markTaskAsCompleted);
router.get('/stats', validate(getStatsSchema), getTaskCompletionStatistic);

export default router;
