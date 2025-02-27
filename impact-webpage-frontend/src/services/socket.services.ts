import environment from "@/config/environment";
import io, { Socket } from "socket.io-client";

declare global {
  interface Window {
    socketInstance?: any;
  }
}

let socket: Socket | null = null;

if (typeof window !== "undefined") {
  // Ensure only one WebSocket connection per browser session
  if (!window.socketInstance) {
    window.socketInstance = io(environment.SOCKET_URL, {
      transports: ["websocket"],
    });
  }
  socket = window.socketInstance;
}

// Store active event listeners to prevent duplicates
const eventListeners = new Map<string, Set<(data: any) => void>>();

const socketServices = {
  on(event: string, callback: (data: any) => void) {
    if (socket) {
      // Prevent duplicate listeners for the same event/callback
      if (!eventListeners.has(event)) {
        eventListeners.set(event, new Set());
      }

      const callbacks = eventListeners.get(event);
      if (callbacks && !callbacks.has(callback)) {
        callbacks.add(callback);
        socket.on(event, callback); // Attach listener only if it's new
      }
    }
  },
  off(event: string, callback?: (data: any) => void) {
    if (socket) {
      if (callback) {
        // Remove only the specific callback if provided
        const callbacks = eventListeners.get(event);
        if (callbacks && callbacks.has(callback)) {
          callbacks.delete(callback);
          socket.off(event, callback);
        }
      } else {
        // Remove all listeners for this event if no callback is provided
        eventListeners.delete(event);
        socket.off(event);
      }
    }
  },
  disconnect() {
    if (socket) {
      console.log("Manually disconnecting socket.");
      socket.disconnect();
      eventListeners.clear(); // Clear stored listeners
    }
  },
};

export default socketServices;
