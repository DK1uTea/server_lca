import express from 'express';
import { addTransaction } from '../controllers/transaction/add-transaction.controller.js';
import { deleteTransaction } from '../controllers/transaction/delete.controller.js';
import { editTransaction } from '../controllers/transaction/edit.controller.js';
import { getConsumptionStatistics } from '../controllers/transaction/get-stats.controller.js';
import { getTransactions } from '../controllers/transaction/get-transactions.controller.js';
import { addTransactionSchema, getTransactionsSchema } from '../validations/transaction.validation.js';
import { validate } from '../middlewares/validate.middleware.js';
import { getStatsSchema } from '../validations/query.validation.js';


const router = express.Router();

router.post('/', validate(addTransactionSchema), addTransaction);
router.get('/', validate(getTransactionsSchema), getTransactions);
router.delete('/:id', deleteTransaction);
router.put('/:id', editTransaction);
router.get('/stats', validate(getStatsSchema), getConsumptionStatistics);

export default router;
