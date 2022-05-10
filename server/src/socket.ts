import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
  },
};

function socket(io: Server) {
  logger.info(`Sockets are running`);
  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`Socket connected: ${socket.id}`);
    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      logger.info(`Socket create room: ${roomName}`);
    });
  });
}

export default socket;
