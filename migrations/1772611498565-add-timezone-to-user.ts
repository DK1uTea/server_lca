import type { Connection } from 'mongoose';

export async function up(connection: Connection): Promise<void> {
  const users = connection.collection('users');
  await users.updateMany(
    { timezone: { $exists: false } },
    { $set: { timezone: 'UTC' } }
  );
}

export async function down(connection: Connection): Promise<void> {
  const users = connection.collection('users');
  await users.updateMany({}, { $unset: { timezone: '' } });
}
