import io, { Socket } from "socket.io-client";
import environment from "@/config/environment";

declare global {
  interface Window {
    socketInstance?: Socket;
  }
}

const getSocket = (): Socket => {
  if (typeof window === "undefined")
    throw new Error("WebSocket is not available on the server.");

  if (!window.socketInstance) {
    // console.log("🔄 Initializing WebSocket...");
    window.socketInstance = io(environment.SOCKET_URL, {
      transports: ["websocket"],
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    // window.socketInstance.on("connect", () =>
    //   console.log("✅ WebSocket Connected"),
    // );
    // window.socketInstance.on("disconnect", (reason) =>
    //   console.warn("⚠️ WebSocket Disconnected:", reason),
    // );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    window.socketInstance.on("connect_error", (err) => {
      // console.error("❌ WebSocket Connection Error:", err);
      setTimeout(() => window.socketInstance?.connect(), 2000);
    });
  }

  return window.socketInstance; // ✅ Always return the same instance
};

export default getSocket;
