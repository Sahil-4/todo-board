import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { verifyAccessTokenSocket } from "../middlewares/authenticate.js";

let io: Server | null = null;

const initiateSocketIO = (httpServer: HttpServer) => {
  // new socket io instance
  io = new Server(httpServer, {
    pingTimeout: 60000,
    path: "/socket.io",
  });

  // authentication
  io.use(verifyAccessTokenSocket);

  // handle session
  io.on("connection", async (socket) => {
    // acknowledgement - user connected
    socket.emit("connected", "Connected to the Socket.IO server");

    // disconnect user
    socket.on("disconnect", async () => {});
  });
};

const getIOInstance = (): Server => {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
};

export { initiateSocketIO, getIOInstance };
