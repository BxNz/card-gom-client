import { useState } from "react";
import { socket } from "./socket";

export default function Lobby() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    socket.emit("join_room", {
      roomId: room,
      name,
    });
  };

  return (
    <div>
      <input placeholder="ชื่อ" onChange={(e) => setName(e.target.value)} />
      <input placeholder="ห้อง" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>เข้าห้อง</button>
    </div>
  );
}
