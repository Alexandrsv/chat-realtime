import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import { createContext, useContext, useEffect, useState } from "react";
import EVENTS from "../config/events";

type Message = { message: string; userName: string; time: string };

interface Context {
  socket: Socket;
  userName?: string;
  setUserName: (userName: string) => void;
  roomId?: string;
  rooms: Record<string, { name: string }>;
  messages: Message[];
  setMessages: (messages: any[]) => void;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
  socket,
  setUserName: () => false,
  roomId: "",
  rooms: {},
  messages: [],
  setMessages: () => false,
});

function SocketsProvider(props: any) {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
      console.log({ value });
      setRoomId(value);
    });
  }, [socket]);
  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
    setMessages([]);
  });

  socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, userName, time }) => {
    setMessages([...messages, { message, userName, time }]);
  });

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
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
