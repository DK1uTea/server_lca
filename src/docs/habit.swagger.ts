/**
 * @swagger
 * tags:
 *   name: Habits
 *   description: Habit management
 */

/**
 * @swagger
 * /habits/user/{userID}:
 *   get:
 *     summary: Get all habits for a user
 *     tags: [Habits]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get habits successfully
 *       401:
 *         description: Unauthorized - Token required or invalid
 */

/**
 * @swagger
 * /habits:
 *   post:
 *     summary: Add a new habit
 *     tags: [Habits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - name
 *               - frequency
 *             properties:
 *               user:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               frequency:
 *                 type: string
 *                 enum: [daily, weekly, monthly]
 *               targetCount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Add habit successfully
 *       401:
 *         description: Unauthorized - Token required or invalid
 */

/**
 * @swagger
 * /habits/{id}:
 *   delete:
 *     summary: Delete a habit
 *     tags: [Habits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Habit deleted successfully
 *       401:
 *         description: Unauthorized - Token required or invalid
 *       404:
 *         description: Habit not found
 */

/**
 * @swagger
 * /habits/{id}:
 *   put:
 *     summary: Edit a habit
 *     tags: [Habits]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               frequency:
 *                 type: string
 *                 enum: [daily, weekly, monthly]
 *               targetCount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Update habit successfully
 *       401:
 *         description: Unauthorized - Token required or invalid
 *       404:
 *         description: Habit not found
 */

/**
 * @swagger
 * /habits/{id}/complete:
 *   patch:
 *     summary: Mark a habit as completed for a specific date
 *     tags: [Habits]
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
 *             required:
 *               - date
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-05-20"
 *     responses:
 *       200:
 *         description: Habit updated successfully
 *       401:
 *         description: Unauthorized - Token required or invalid
 *       404:
 *         description: Habit not found
 */

/**
 * @swagger
 * /habits/stats/{userID}:
 *   get:
 *     summary: Get habit completion statistics for a user
 *     tags: [Habits]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *       401:
 *         description: Unauthorized - Token required or invalid
 */
