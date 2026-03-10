import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Notification from '../models/notification.model.js';
import * as notificationService from '../services/notification/notification.service.js';
import connectDB from '../config/db.config.js';

dotenv.config();

/**
 * Simple test script to verify notification persistence and service logic.
 * Note: This doesn't test SSE as it requires a running Express server and active connections.
 */
const runTests = async () => {
  try {
    // 1. Connect to DB
    await connectDB();
    console.log('Connected to MongoDB');

    const testUserId = new mongoose.Types.ObjectId().toString();

    // 2. Test createNotification
    console.log('\nTesting createNotification...');
    const notification = await notificationService.createNotification({
      userId: testUserId,
      title: "Test Notification",
      message: "This is a test notification message",
      type: "system"
    });
    console.log('Created:', notification.title);

    // 3. Test getUserNotifications
    console.log('\nTesting getUserNotifications...');
    const notifications = await notificationService.getUserNotifications(testUserId);
    console.log('Found:', notifications.length, 'notifications');
    if (notifications.length > 0) {
      console.log('Latest title:', notifications[0].title);
    }

    // 4. Test markAsRead
    console.log('\nTesting markAsRead...');
    const updated = await notificationService.markAsRead(notification._id as string, testUserId);
    console.log('Updated isRead:', updated?.isRead);

    // 5. Test markAllAsRead
    console.log('\nTesting markAllAsRead...');
    await notificationService.markAllAsRead(testUserId);
    const finalCheck = await notificationService.getUserNotifications(testUserId);
    console.log('All read check:', finalCheck.every(n => n.isRead));

    // Cleanup
    await Notification.deleteMany({ userId: testUserId });
    console.log('\nTest data cleaned up.');

    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
};

runTests();
