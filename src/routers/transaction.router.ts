import express from 'express';
import { addTransaction } from '../controllers/transaction/add-transaction.controller.js';
import { deleteTransaction } from '../controllers/transaction/delete.controller.js';
import { editTransaction } from '../controllers/transaction/edit.controller.js';
import { getConsumptionStatistics } from '../controllers/transaction/get-stats.controller.js';
import { getTransactions } from '../controllers/transaction/get-transactions.controller.js';


const router = express.Router();

router.post('/', addTransaction);
router.get('/', getTransactions);
router.delete('/:id', deleteTransaction);
router.put('/:id', editTransaction);
router.get('/stats', getConsumptionStatistics);

export default router;
