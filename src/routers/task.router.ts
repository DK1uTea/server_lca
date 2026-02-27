import express from 'express';
import { getTask } from '../controllers/task/get-task.controller.js';
import { addTask } from '../controllers/task/add-task.controller.js';
import { editTask } from '../controllers/task/edit-task.controller.js';
import { deleteTask } from '../controllers/task/delete-task.controller.js';
import { markTaskAsCompleted } from '../controllers/task/mark-completed.controller.js';
import { getTaskCompletionStatistic } from '../controllers/task/get-stats.controller.js';

const router = express.Router();

router.post('/', addTask);
router.get('/user/:userID', getTask);
router.put('/:id', editTask);
router.delete('/:id', deleteTask);
router.patch('/:id/complete', markTaskAsCompleted);
router.get('/stats/:userID', getTaskCompletionStatistic);

export default router;
