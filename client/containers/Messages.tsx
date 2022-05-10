import React, { FC, useRef } from "react";
import { useSockets } from "../context/socket.context";
import EVENTS from "../config/events";

const MessagesContainer: FC = () => {
  const { socket, messages, roomId, userName, setMessages } = useSockets();
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleSendMessage() {
    const message = messageRef?.current?.value;
    if (!String(message).trim()) return;
    socket.emit(EVENTS.CLIENT.SEND_MESSAGE, { message, roomId, userName });
    const date = new Date();
    setMessages([
      ...messages,
      {
        userName: userName,
        message,
        roomId: roomId,
        time: date.toLocaleTimeString(),
      },
    ]);
  }
  console.log({ roomId });

  if (!roomId) return <></>;

  return (
    <div>
      <div>Messages</div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <span>
              {message.userName}: {message.message} <br /> {message.time}
            </span>
          </div>
        ))}
        <div>
          <textarea ref={messageRef} placeholder={"Message"} rows={1} />
          <button onClick={handleSendMessage}>SEND</button>
        </div>
      </div>
    </div>
  );
};

export default MessagesContainer;
