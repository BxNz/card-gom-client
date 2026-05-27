import { motion } from "framer-motion";

export default function Card({ card, onPlay, disabled }) {
  const isRedSuit = card.suit === "♥" || card.suit === "♦";

  return (
    <motion.div
      drag={!disabled}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileHover={{ scale: 1.1, y: -10 }}
      whileDrag={{ scale: 1.2, zIndex: 10 }}
      onDragEnd={(e, info) => {
        if (info.point.y < 300) {
          onPlay(card);
        }
      }}
      style={{
        width: 80,
        height: 120,
        borderRadius: 10,
        background: "linear-gradient(180deg, #1f2937 0%, #111827 100%)",
        border: "1px solid #334155",
        boxShadow: "0 10px 24px rgba(0, 0, 0, 0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: 700,
        color: isRedSuit ? "#f87171" : "#e5e7eb",
        position: "relative",
        cursor: "grab",
      }}
    >
      {card.value}
      {card.suit}
    </motion.div>
  );
}
