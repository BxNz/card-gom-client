import { useState } from "react";
import { socket } from "./socket";
import Game from "./pages/Game";

const styles = {
  wrap: {
    height: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    border: "0.5px solid rgba(255,255,255,0.12)",
    borderRadius: 16,
    padding: "2.5rem 2rem",
    width: 320,
    animation: "fadeIn .5s ease both",
  },
  online: {
    fontSize: 13,
    color: "#4ade80",
    fontWeight: 500,
    margin: "0 0 1.5rem",
  },
  dot: {
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#4ade80",
    marginRight: 6,
  },
  title: { fontSize: 22, fontWeight: 500, color: "#f1f5f9", margin: "0 0 4px" },
  sub: { fontSize: 13, color: "#94a3b8", margin: "0 0 2rem" },
  label: { display: "block", fontSize: 12, color: "#94a3b8", marginBottom: 6 },
  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "rgba(255,255,255,0.06)",
    border: "0.5px solid rgba(255,255,255,0.15)",
    borderRadius: 8,
    color: "#f1f5f9",
    fontSize: 15,
    padding: "10px 14px",
    outline: "none",
    marginBottom: "1rem",
    fontFamily: "inherit",
  },
  btn: {
    width: "100%",
    padding: 12,
    background: "linear-gradient(135deg,#3b82f6,#6366f1)",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
  },
  hint: {
    fontSize: 12,
    color: "#475569",
    textAlign: "center",
    marginTop: "1rem",
  },
};
export default function App() {
  const [joined, setJoined] = useState(false);

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (!name.trim() || !room.trim()) return;

    socket.emit("join_room", {
      roomId: room.trim(),
      name: name.trim(),
    });

    setJoined(true);
  };

  if (joined) {
    return <Game roomId={room.trim()} playerName={name.trim()} />;
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <p style={styles.online}>
          <span style={styles.dot} />
          ອອນລາຍ
        </p>
        <h1 style={styles.title}>ເຂົ້າຮ່ວມເກມ</h1>
        <p style={styles.sub}>ປ້ອນຊື່ ແລະ ລະຫັດຫ້ອງຂອງທ່ານ</p>

        <label style={styles.label}>ຊື່ຜູ້ຫຼິ້ນ</label>
        <input
          style={styles.input}
          placeholder="ຊື່ຂອງທ່ານ..."
          onChange={(e) => setName(e.target.value)}
        />

        <label style={styles.label}>ລະຫັດຫ້ອງ</label>
        <input
          style={styles.input}
          placeholder="ລະຫັດຫ້ອງ..."
          onChange={(e) => setRoom(e.target.value)}
        />

        <button style={styles.btn} onClick={joinRoom}>
          ▶ ເຂົ້າຫ້ອງ
        </button>
        <p style={styles.hint}>ຫ້ອງໃໝ່ຈະຖືກສ້າງອັດຕະໂນມັດຖ້າຍັງບໍ່ມີ</p>
      </div>
    </div>
  );
}