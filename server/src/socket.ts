import { Server, Socket } from "socket.io";
import logger from "./utils/logger";
import { nanoid } from "nanoid";

const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_MESSAGE: "SEND_MESSAGE",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
  },
};

const rooms: Record<string, { name: string }> = {};

function socket(io: Server) {
  logger.info(`Sockets are running`);
  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`Socket connected: ${socket.id}`);
    socket.emit(EVENTS.SERVER.ROOMS, rooms);
    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      logger.info(`Socket create room: ${roomName}`);
      const roomId = nanoid();
      rooms[roomId] = {
        name: roomName,
      };
      socket.join(roomId);
      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
      socket.emit(EVENTS.SERVER.ROOMS, rooms);
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
      socket.on(EVENTS.CLIENT.SEND_MESSAGE, ({ roomId, message, userName }) => {
        const date = new Date();
        socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
          message,
          userName,
          time: date.toLocaleString(),
        });
      });
    });
  });
}

export default socket;
