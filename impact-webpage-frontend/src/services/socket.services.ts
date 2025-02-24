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

const socketServices = {
  on(event: string, callback: (data: any) => void) {
    if (socket) {
      socket.off(event);
      socket.on(event, callback);
    }
  },
  off(event: string, callback: (data: any) => void) {
    if (socket) {
      socket.off(event);
      socket.on(event, callback);
    }
  },
  disconnect() {
    if (socket) {
      console.log("Manually disconnecting socket.");
      socket.disconnect();
    }
  },
};

export default socketServices;
