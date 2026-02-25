import express from 'express';
import { addTransaction, deleteTransaction, editTransaction, getConsumptionStatistics, getTransactionByDay } from '../controllers/transaction.controller.js';

const router = express.Router();

router.post('/', addTransaction);
router.get('/', getTransactionByDay);
router.delete('/:id', deleteTransaction);
router.put('/:id', editTransaction);
router.get('/stats/:userID', getConsumptionStatistics);

export default router;
