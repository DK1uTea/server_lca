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
 *               - title
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
 *       201:
 *         description: Task added successfully
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks for the authenticated user
 *     tags: [Tasks]
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
 *         description: Number of tasks per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [title, dueDate, completedDate, createdAt]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for task title
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *         description: Comma-separated list of priorities (e.g., "low,high")
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Comma-separated list of statuses (e.g., "pending,completed")
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
 * /tasks/stats:
 *   get:
 *     summary: Get task completion statistics for the authenticated user
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *       401:
 *         description: Unauthorized - Token required or invalid
 */
