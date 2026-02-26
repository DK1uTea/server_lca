/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Add a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - title
 *             properties:
 *               user:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *     responses:
 *       201:
 *         description: Task added successfully
 */

/**
 * @swagger
 * /tasks/user/{userID}:
 *   get:
 *     summary: Get all tasks for a user
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Edit a task
 *     tags: [Tasks]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *     responses:
 *       200:
 *         description: Updated task successfully
 *       401:
 *         description: Unauthorized - Token required or invalid
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized - Token required or invalid
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /tasks/{id}/complete:
 *   patch:
 *     summary: Mark a task as completed
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task marked as completed
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /tasks/stats/{userID}:
 *   get:
 *     summary: Get task completion statistics for a user
 *     tags: [Tasks]
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
