import express from 'express';
import * as notificationController from '../controllers/notification/notification.controller.js';

const router = express.Router();

// SSE Streaming endpoint
router.get('/stream', notificationController.streamNotifications);

// REST API endpoints
router.get('/', notificationController.getNotifications);
router.patch('/:id/read', notificationController.markNotificationAsRead);
router.patch('/read-all', notificationController.markAllNotificationsAsRead);

export default router;
