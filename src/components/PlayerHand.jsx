import Card from "./card";

export default function PlayerHand({ hand, onPlay, canPlay }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        justifyContent: "center",
        position: "fixed",
        bottom: 30,
        width: "100%",
      }}
    >
      {hand.map((card, index) => (
        <Card
          key={index}
          card={card}
          onPlay={() => onPlay(card, index)}
          disabled={!canPlay}
        />
      ))}
    </div>
  );
}
