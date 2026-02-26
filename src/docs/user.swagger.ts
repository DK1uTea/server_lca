/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User specific operations
 */

/**
 * @swagger
 * /users/profile/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Token required or invalid
 *       404:
 *         description: User not found
 */
