/**
 * @swagger
 * tags:
 *   name: Habits
 *   description: Habit management
 */

/**
 * @swagger
 * /habits:
 *   get:
 *     summary: Get all habits for the authenticated user
 *     tags: [Habits]
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
 *         name: search
 *         schema:
 *           type: string
 *         description: Search habits by name (case-insensitive)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, createdAt]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *       - in: query
 *         name: frequency
 *         schema:
 *           type: string
 *         description: Filter by frequency (comma-separated values - daily,weekly,monthly)
 *         example: "daily,weekly"
 *     responses:
 *       200:
 *         description: Get habits successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     habits:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           userId:
 *                             type: string
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *                           frequency:
 *                             type: string
 *                             enum: [daily, weekly, monthly]
 *                           targetCount:
 *                             type: number
 *                           completedDates:
 *                             type: array
 *                             items:
 *                               type: string
 *                               format: date
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
 *                   example: "Get habits successfully!"
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
 *               - name
 *               - frequency
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
 * /habits/stats:
 *   get:
 *     summary: Get habit completion statistics for the authenticated user
 *     tags: [Habits]
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *       401:
 *         description: Unauthorized - Token required or invalid
 */
