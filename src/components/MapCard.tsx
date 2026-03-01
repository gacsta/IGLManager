type MapCardProps = {
  map: { key: string; label: string; thumbnail: string };
  onClick: () => void;
};

export default function MapCard({ map, onClick }: MapCardProps) {
  return (
    <div
      className="map-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      style={{ aspectRatio: "4 / 3", background: "#111" }}
    >
      <img className="map-card-img" src={map.thumbnail} alt={map.label} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

        <div
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            bottom: 18,

            fontFamily:
              '"CSGO Font", "Counter-Strike", "Roboto Condensed", Roboto, Arial, sans-serif',

            fontWeight: 800,
            fontSize: "clamp(22px, 2vw, 48px)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",

            color: "white",
            textShadow: "0 8px 24px rgba(0,0,0,0.85)",

            pointerEvents: "none",
          }}
        >
          {map.label}
        </div>
{/* 
        <div
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            bottom: 12,
            height: 2,
            background: "rgba(255,255,255,0.7)",
            opacity: 0.4,
          }}
        /> */}


    </div>
  );
}