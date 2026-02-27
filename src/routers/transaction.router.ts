import express from 'express';
import { addTransaction } from '../controllers/transaction/add-transaction.controller.js';
import { getTransactionByDay } from '../controllers/transaction/get-by-day.controller.js';
import { deleteTransaction } from '../controllers/transaction/delete.controller.js';
import { editTransaction } from '../controllers/transaction/edit.controller.js';
import { getConsumptionStatistics } from '../controllers/transaction/get-stats.controller.js';

const router = express.Router();

router.post('/', addTransaction);
router.get('/day', getTransactionByDay);
router.delete('/:id', deleteTransaction);
router.put('/:id', editTransaction);
router.get('/stats/:userID', getConsumptionStatistics);

export default router;
