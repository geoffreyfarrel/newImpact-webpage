// import getSocket from "@/services/socket.services";
// import { createContext, useContext, useEffect, useState } from "react";
// import { Socket } from "socket.io-client";

// const WebSocketContext = createContext<Socket | null>(null);

// export const WebSocketProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const socketInstance = getSocket(); // ✅ Correctly calling function to get the `Socket` instance
//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect(); // ✅ Now this works because it's a `Socket` instance
//     };
//   }, []);

//   return (
//     <WebSocketContext.Provider value={socket}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// };

// export const useWebSocket = () => useContext(WebSocketContext);
