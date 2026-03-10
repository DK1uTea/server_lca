// Import your schemas here
import type { Connection } from 'mongoose';

export async function up(connection: Connection): Promise<void> {
  const notifications = connection.collection('notifications');

  // Create indexes for efficient querying
  await notifications.createIndex({ userId: 1, createdAt: -1 });
  await notifications.createIndex({ userId: 1, isRead: 1 });
}

export async function down(connection: Connection): Promise<void> {
  const notifications = connection.collection('notifications');

  // Drop the collection or just the indexes
  // Usually, for a new model, we might want to drop the collection if we're completely reverting
  await notifications.drop();
}
