import { useState } from "react";
import { socket } from "./socket";
import Game from "./pages/Game";

export default function App() {
  const [joined, setJoined] = useState(false);

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    socket.emit("join_room", {
      roomId: room,
      name,
    });

    setJoined(true);

    // 🔥 เริ่มเกมอัตโนมัติ
    setTimeout(() => {
      socket.emit("start_game", room);
    }, 1000);
  };

  if (joined) {
    return <Game roomId={room} />;
  }

  return (
    <div
      style={{
        height: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: 10 }}>
        <input placeholder="ຊື່" onChange={(e) => setName(e.target.value)} />

        <input placeholder="ຫ້ອງ" onChange={(e) => setRoom(e.target.value)} />

        <button onClick={joinRoom}>ເຂົ້າຫ້ອງ</button>
      </div>
    </div>
  );
}
