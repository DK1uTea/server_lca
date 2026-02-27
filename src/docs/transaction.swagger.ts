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
 *               - type
 *               - category
 *               - amount
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
 *       201:
 *         description: Add transaction successfully
 *       401:
 *         description: Unauthorized - Token required or invalid
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions for the authenticated user
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [Income, Expense]
 *         description: Filter transactions by type
 *       - in: query
 *         name: createdDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-05-20"
 *         description: Filter transactions by created date
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     transactions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           userId:
 *                             type: string
 *                           type:
 *                             type: string
 *                             enum: [Income, Expense]
 *                           category:
 *                             type: string
 *                           amount:
 *                             type: number
 *                           description:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         total:
 *                           type: integer
 *                         totalPage:
 *                           type: integer
 *                 message:
 *                   type: string
 *                   example: "Transactions retrieved successfully!"
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized - Token required or invalid
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
 *       401:
 *         description: Unauthorized - Token required or invalid
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
 *       401:
 *         description: Unauthorized - Token required or invalid
 *       404:
 *         description: Transaction not found
 */

/**
 * @swagger
 * /transactions/stats:
 *   get:
 *     summary: Get consumption statistics for the authenticated user
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *       401:
 *         description: Unauthorized - Token required or invalid
 */
