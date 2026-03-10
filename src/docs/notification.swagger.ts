/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - title
 *         - message
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the notification
 *         userId:
 *           type: string
 *           description: The id of the user the notification belongs to
 *         title:
 *           type: string
 *           description: The title of the notification
 *         message:
 *           type: string
 *           description: The content of the notification
 *         type:
 *           type: string
 *           enum: [habit, system, task]
 *           description: The type of notification
 *         isRead:
 *           type: boolean
 *           description: Whether the notification has been read
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the notification was created
 *       example:
 *         id: 60d5ecb848725c2c42b10f24
 *         userId: 60d5ecb848725c2c42b10f25
 *         title: Habit completed
 *         message: Great job completing your habit today!
 *         type: habit
 *         isRead: false
 *         createdAt: 2026-03-10T09:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management and real-time streaming
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Returns the latest notifications for the authenticated user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /notifications/{id}/read:
 *   patch:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The notification id
 *     responses:
 *       200:
 *         description: The notification was successfully marked as read
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notification not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /notifications/read-all:
 *   patch:
 *     summary: Mark all notifications as read for the authenticated user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /notifications/stream:
 *   get:
 *     summary: Establish an SSE connection that streams real-time notifications
 *     description: This endpoint keeps the connection open and streams events using Server-Sent Events (SSE).
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: SSE connection established
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 *               example: "data: {\"event\": \"notification\", \"data\": {...}}\n\n"
 */
export const notificationSwagger = {}; // Empty export to make it a module
