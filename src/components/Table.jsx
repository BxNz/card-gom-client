export default function Table({ table }) {
  const renderCardText = (card) => {
    if (Array.isArray(card)) {
      return card.map((c) => `${c.value}${c.suit}`).join(" ");
    }
    return `${card.value}${card.suit}`;
  };

  const isRedCard = (card) => {
    const primary = Array.isArray(card) ? card[0] : card;
    return primary?.suit === "♥" || primary?.suit === "♦";
  };

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
            color: isRedCard(t.card) ? "#f87171" : "#e5e7eb",
          }}
        >
          {renderCardText(t.card)}
        </div>
      ))}
    </div>
  );
}
