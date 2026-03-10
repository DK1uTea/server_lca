import { Request, Response } from 'express';
import * as notificationService from '../../services/notification/notification.service.js';
import { sseManager } from '../../services/notification/sse-manager.js';

/**
 * Get latest notifications for the current user
 */
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const notifications = await notificationService.getUserNotifications(userId);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};

/**
 * Mark a specific notification as read
 */
export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const notificationId = req.params.id as string;
    const notification = await notificationService.markAsRead(notificationId, userId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error marking notification as read', error });
  }
};

/**
 * Mark all notifications for the current user as read
 */
export const markAllNotificationsAsRead = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    await notificationService.markAllAsRead(userId);
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking all notifications as read', error });
  }
};

/**
 * Establish an SSE connection for real-time notifications
 */
export const streamNotifications = (req: Request, res: Response) => {
  const userId = (req as any).user._id.toString();

  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  // Mandatory for SSE: Send an initial heartbeat or empty data to keep the connection open
  res.write('retry: 10000\n\n');
  res.write('data: {"event": "connected"}\n\n');

  // Register the connection
  sseManager.addConnection(userId, res);

  // Clean up when the client disconnects
  req.on('close', () => {
    sseManager.removeConnection(userId, res);
    res.end();
  });
};
