import type { NextPage } from "next";
import { useSockets } from "../context/socket.context";
import RoomsContainer from "../containers/Rooms";
import MessagesContainer from "../containers/Messages";
import { useRef } from "react";

const Home: NextPage = () => {
  const { socket, userName, setUserName } = useSockets();

  const userNameRef = useRef<HTMLInputElement>(null);

  function handleSetUserName() {
    const value = userNameRef?.current?.value;
    if (!value) {
      return;
    }
    setUserName(value);
    localStorage.setItem("userName", value);
  }

  return (
    <div>
      {!userName && (
        <div>
          <div>
            <input ref={userNameRef} placeholder={"username"} />
            <button onClick={handleSetUserName}>START</button>
          </div>
        </div>
      )}
      {userName && (
        <div>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )}
    </div>
  );
};

export default Home;
