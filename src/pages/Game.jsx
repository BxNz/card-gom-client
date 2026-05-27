import { useEffect, useState } from "react";
import { socket } from "../socket";
import PlayerHand from "../components/PlayerHand";
import Table from "../components/Table";

export default function Game({ roomId, playerName }) {
  const [hand, setHand] = useState([]);
  const [table, setTable] = useState([]);
  const [canPlay, setCanPlay] = useState(true);
  const [players, setPlayers] = useState([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const syncRoom = () => {
      socket.emit("join_room", {
        roomId,
        name: playerName || "Player",
      });
      socket.emit("get_room_state", roomId);
    };

    const onRoomUpdate = (game) => {
      setPlayers(game.players || []);
      setStarted(Boolean(game.started));
    };

    const onGameStarted = (game) => {
      const me = game.players.find((p) => p.id === socket.id);
      setPlayers(game.players || []);
      setTable(game.table || []);
      setHand(me?.hand || []);
      setStarted(Boolean(game.started));
    };

    const onGameUpdate = (game) => {
      if (!game || !game.players) return;
      const me = game.players.find((p) => p.id === socket.id);
      setPlayers(game.players || []);
      setHand(me?.hand || []);
      setTable(game.table || []);
      setStarted(Boolean(game.started));
    };

    socket.on("room_update", onRoomUpdate);
    socket.on("game_started", onGameStarted);
    socket.on("game_update", onGameUpdate);
    socket.on("connect", syncRoom);

    syncRoom();

    return () => {
      socket.off("room_update", onRoomUpdate);
      socket.off("game_started", onGameStarted);
      socket.off("game_update", onGameUpdate);
      socket.off("connect", syncRoom);
    };
  }, [roomId, playerName]);

  const playCard = (index) => {
    if (!canPlay || !started) return;

    socket.emit("play_card", {
      roomId,
      cardIndexes: [index],
    });

    setCanPlay(false);
    setTimeout(() => setCanPlay(true), 800);
  };

  const startGame = () => {
    socket.emit("start_game", roomId);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0" }}>
      <div
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          padding: "10px 14px",
          borderRadius: 10,
          background: "rgba(15, 23, 42, 0.85)",
          border: "1px solid #334155",
          zIndex: 20,
        }}
      >
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>Room: {roomId}</div>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>
          Players ({players.length})
        </div>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>
          Status: {started ? "In game" : "Waiting"}
        </div>
        {!started && (
          <button
            onClick={startGame}
            disabled={players.length < 2}
            style={{
              marginBottom: 8,
              width: "100%",
              borderRadius: 8,
              border: "1px solid #475569",
              background: players.length >= 2 ? "#1d4ed8" : "#334155",
              color: "#e2e8f0",
              padding: "6px 10px",
              cursor: players.length >= 2 ? "pointer" : "not-allowed",
            }}
          >
            Start Game
          </button>
        )}
        {players.map((p) => (
          <div key={p.id} style={{ fontSize: 13, opacity: p.id === socket.id ? 1 : 0.85 }}>
            {p.id === socket.id ? "You" : p.name}
          </div>
        ))}
      </div>
      <Table table={table} />
      <PlayerHand hand={hand} onPlay={playCard} canPlay={canPlay} />
    </div>
  );
}
