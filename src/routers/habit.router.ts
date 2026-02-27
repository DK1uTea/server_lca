import express from 'express';
import { getHabit } from '../controllers/habit/get-habit.controller.js';
import { addHabit } from '../controllers/habit/add-habit.controller.js';
import { editHabit } from '../controllers/habit/edit-habit.controller.js';
import { deleteHabit } from '../controllers/habit/delete-habit.controller.js';
import { markHabitAsCompleted } from '../controllers/habit/mark-completed.controller.js';
import { getHabitCompletionStatistic } from '../controllers/habit/get-stats.controller.js';

const router = express.Router();

router.get('/', getHabit);
router.post('/', addHabit);
router.delete('/:id', deleteHabit);
router.put('/:id', editHabit);
router.patch('/:id/complete', markHabitAsCompleted);
router.get('/stats', getHabitCompletionStatistic);

export default router;
