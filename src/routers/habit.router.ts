import express from 'express';
import { addHabit, getHabit, deleteHabit, editHabit, markHabitAsCompleted, getHabitCompletionStatistic } from '../controllers/habit.controller.js';

const router = express.Router();

router.get('/user/:userID', getHabit);
router.post('/', addHabit);
router.delete('/:id', deleteHabit);
router.put('/:id', editHabit);
router.patch('/:id/complete', markHabitAsCompleted);
router.get('/stats/:userID', getHabitCompletionStatistic);

export default router;
