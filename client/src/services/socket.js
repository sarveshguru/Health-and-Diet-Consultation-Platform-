import { io } from "socket.io-client";

// Initialize socket connection
const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"],
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 20000,
});

export default socket;
