import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import { createContext, useContext, useState } from "react";

interface Context {
  socket: Socket;
  userName?: string;
  setUserName: (userName: string) => void;
  roomId?: string;
  rooms: any[];
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
  socket,
  setUserName: () => false,
  roomId: "",
  rooms: [],
});

function SocketsProvider(props: any) {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState([]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        userName,
        setUserName,
        roomId,
        rooms,
        setRooms,
        setRoomId,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
