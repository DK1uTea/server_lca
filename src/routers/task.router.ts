import express from 'express';
import { getTask, addTask, editTask, deleteTask, markTaskAsCompleted, getTaskCompletionStatistic } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/', addTask);
router.get('/user/:userID', getTask);
router.put('/:id', editTask);
router.delete('/:id', deleteTask);
router.patch('/:id/complete', markTaskAsCompleted);
router.get('/stats/:userID', getTaskCompletionStatistic);

export default router;
