"use client";

import { useEffect, useState } from "react";
import { socket } from "../../../socket/socket";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [room, setRoom] = useState<string>("");
  const [joinRoom, setJoinRoom] = useState<string>("");
  const [transport, setTransport] = useState("N/A");
  const [player, setPlayer] = useState<string>("");
  const [playerList, setPlayerList] = useState<string[]>([]);

  console.log({ isConnected, transport });

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport: { name: string }) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    function handleStateList(data: { players: string[] }) {
      console.log("Received player update:", data.players);
      setPlayerList(data.players);
    }

    socket.on("state:list", handleStateList);

    return () => {
      socket.off("state:list", handleStateList);
    };
  }, [socket]);

  console.log("client:", playerList);

  function handleButtonClick() {
    try {
      socket.emit("update:player", { playerName: player, roomID: joinRoom });
      setPlayer("");
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  function onCreatingRoom() {
    function generateRoomId() {
      return Math.floor(1000 + Math.random() * 9000).toString();
    }
    const randomRoomID = generateRoomId();
    socket.emit("create:room", randomRoomID);
    setRoom(randomRoomID);
  }
  function onJoiningRoom() {
    socket.emit("join:room", joinRoom);
  }
  useEffect(() => {
    socket.emit("state:request");
  }, []);

  return (
    <div className="flex flex-col max-w-sm gap-4 m-4">
      {room && <p>Room ID: {room}</p>}
      <button className="bg-blue-500" onClick={onCreatingRoom}>
        Create Room
      </button>

      <input
        value={joinRoom}
        onChange={(e) => setJoinRoom(e.target.value)}
        placeholder="Join Room ID"
        type="text"
      />
      <button className="bg-blue-500" onClick={onJoiningRoom}>
        Join Room
      </button>
      {/* <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p> */}
      <input
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
        placeholder="Enter player name"
        type="text"
      />
      <button className="bg-blue-500" onClick={handleButtonClick}>
        Add player
      </button>
      {playerList.length > 0 && (
        <div>
          <h2>Player List:</h2>
          <ul>
            {playerList.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
