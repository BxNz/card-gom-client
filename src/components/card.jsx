import { motion } from "framer-motion";

export default function Card({ card, onPlay, disabled }) {
  const isRedSuit = card.suit === "♥" || card.suit === "♦";

  return (
    <motion.div
      drag={disabled ? false : "y"}
      dragElastic={0.2}
      dragMomentum={false}
      whileHover={{ scale: 1.1, y: -10 }}
      whileDrag={{ scale: 1.2, zIndex: 10 }}
      onDragEnd={(e, info) => {
        // Use drag offset so it works consistently across different screen sizes.
        if (info.offset.y < -80) {
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
