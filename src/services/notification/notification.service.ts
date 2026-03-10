import Notification, { INotification } from '../../models/notification.model.js';
import { sseManager } from './sse-manager.js';

interface CreateNotificationParams {
  userId: string;
  title: string;
  message: string;
  type: string;
}

/**
 * Creates a notification in the database and streams it to the user.
 */
export const createNotification = async (params: CreateNotificationParams): Promise<INotification> => {
  const { userId, title, message, type } = params;

  // 1. Persist in database
  const notification = new Notification({
    userId,
    title,
    message,
    type,
    isRead: false,
    createdAt: new Date(),
  });

  await notification.save();

  // 2. Push to all active SSE connections for this user
  sseManager.sendToUser(userId, {
    event: 'notification',
    data: notification
  });

  return notification;
};

/**
 * Retrieves the latest notifications for an authenticated user.
 */
export const getUserNotifications = async (userId: string, limit: number = 50): Promise<INotification[]> => {
  return await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

/**
 * Marks a specific notification as read.
 */
export const markAsRead = async (notificationId: string, userId: string): Promise<INotification | null> => {
  return await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { isRead: true },
    { new: true }
  );
};

/**
 * Marks all notifications for a user as read.
 */
export const markAllAsRead = async (userId: string): Promise<any> => {
  return await Notification.updateMany(
    { userId, isRead: false },
    { isRead: true }
  );
};
