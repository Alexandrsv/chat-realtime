import type { NextPage } from "next";
import { useSockets } from "../context/socket.context";

const Home: NextPage = () => {
  const { socket } = useSockets();
  return <p>{socket.id}</p>;
};

export default Home;
