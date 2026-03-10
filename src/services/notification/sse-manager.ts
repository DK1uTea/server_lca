import { Response } from 'express';

/**
 * SSEConnectionManager
 *
 * Manages active SSE connections for real-time notifications.
 * Allows multiple connections per user (e.g., multiple browser tabs).
 */
class SSEConnectionManager {
  // Map of userId to array of active Express Response objects (connections)
  private connections: Map<string, Response[]> = new Map();

  /**
   * Register a new connection for a user
   */
  addConnection(userId: any, res: Response) {
    const id = userId.toString();
    if (!this.connections.has(id)) {
      this.connections.set(id, []);
    }
    this.connections.get(id)?.push(res);

    console.log(`SSE: New connection for user ${id}. Total connections for user: ${this.connections.get(id)?.length}`);
  }

  /**
   * Remove a specific connection for a user
   */
  removeConnection(userId: any, res: Response) {
    const id = userId.toString();
    const userConnections = this.connections.get(id);
    if (!userConnections) return;

    const index = userConnections.indexOf(res);
    if (index !== -1) {
      userConnections.splice(index, 1);
      console.log(`SSE: Connection removed for user ${id}. Remaining: ${userConnections.length}`);
    }

    if (userConnections.length === 0) {
      this.connections.delete(id);
    }
  }

  /**
   * Broadcast a notification to all active connections of a user
   */
  sendToUser(userId: any, data: any) {
    const id = userId.toString();
    const userConnections = this.connections.get(id);
    if (!userConnections || userConnections.length === 0) {
      return;
    }

    const payload = `data: ${JSON.stringify(data)}\n\n`;

    userConnections.forEach((res) => {
      try {
        res.write(payload);
      } catch (error) {
        console.error(`SSE: Error sending to user ${userId}:`, error);
        // Connection might be dead, but removal is usually handled by the 'close' event in the controller
      }
    });
  }
}

// Singleton instance
export const sseManager = new SSEConnectionManager();
export default sseManager;
