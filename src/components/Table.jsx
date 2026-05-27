export default function Table({ table }) {
  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      {table.map((t, i) => (
        <div
          key={i}
          style={{
            width: 80,
            height: 120,
            background: "linear-gradient(180deg, #1f2937 0%, #111827 100%)",
            border: "1px solid #334155",
            borderRadius: 10,
            boxShadow: "0 10px 24px rgba(0, 0, 0, 0.35)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 700,
            color:
              t.card.suit === "♥" || t.card.suit === "♦"
                ? "#f87171"
                : "#e5e7eb",
          }}
        >
          {t.card.value}
          {t.card.suit}
        </div>
      ))}
    </div>
  );
}
