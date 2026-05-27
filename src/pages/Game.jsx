import { useEffect, useState } from "react";
import { socket } from "../socket";
import PlayerHand from "../components/PlayerHand";
import Table from "../components/Table";

export default function Game() {
  const [hand, setHand] = useState([]);
  const [table, setTable] = useState([]);
  const [canPlay, setCanPlay] = useState(true);

  useEffect(() => {
    socket.on("game_started", (game) => {
      const me = game.players.find((p) => p.id === socket.id);
      setHand(me.hand);
    });

    socket.on("game_update", (game) => {
      const me = game.players.find((p) => p.id === socket.id);
      setHand(me.hand);
      setTable(game.table);
    });
  }, []);

  const playCard = (index) => {
    if (!canPlay) return;

   socket.emit("play_card", {
     roomId: "room1",
     cardIndexes: [0, 1], // เล่นคู่ / เรียงได้
   });

    setCanPlay(false);
    setTimeout(() => setCanPlay(true), 800);
  };

  return (
    <div>
      <Table table={table} />
      <PlayerHand hand={hand} onPlay={playCard} disabled={!canPlay} />
    </div>
  );
}
