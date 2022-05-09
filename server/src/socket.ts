import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

const EVENTS = {
  connection: "connection",
};

function socket(io: Server) {
  logger.info(`Sockets are running`);
  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`Socket connected: ${socket.id}`);
  });
}

export default socket;
