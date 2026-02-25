/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Add a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - type
 *               - category
 *               - amount
 *             properties:
 *               user:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [Income, Expense]
 *               category:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Add transaction successfully
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get transactions by day
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: day
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-05-20"
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *       400:
 *         description: userID and day are required
 */

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 */

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Edit a transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [Income, Expense]
 *               category:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update transaction successfully
 *       404:
 *         description: Transaction not found
 */

/**
 * @swagger
 * /transactions/stats/{userID}:
 *   get:
 *     summary: Get consumption statistics for a user
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 */
