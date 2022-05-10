import React, { FC, useRef } from "react";
import { useSockets } from "../context/socket.context";
import EVENTS from "../config/events";

const RoomsContainer: FC = () => {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef<HTMLInputElement>(null);

  function handleCreateRoom() {
    const roomName = newRoomRef?.current?.value || "";
    if (!String(roomName).trim()) return;

    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    if (newRoomRef.current) {
      newRoomRef.current.value = "";
    }
  }

  console.log({ roomId, rooms });

  return (
    <nav>
      <div>
        <input ref={newRoomRef} placeholder={"Room name"} />
        <button onClick={handleCreateRoom}>CREATE ROOM</button>
      </div>
      {Object.keys(rooms).map((key) => (
        <div key={key}>
          <span>{rooms[key].name}</span>
        </div>
      ))}
    </nav>
  );
};

export default RoomsContainer;
