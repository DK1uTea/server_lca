/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User specific operations
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get profile for the authenticated user
 *     tags: [Users]
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

/**
 * @swagger
 * /users/profile:
 *   patch:
 *     summary: Update profile for the authenticated user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               description:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized - Token required or invalid
 *       404:
 *         description: User not found
 */
