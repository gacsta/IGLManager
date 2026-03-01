import { useNavigate } from "react-router-dom";
import MapCard from "../components/MapCard";

const MAPS = [
  { key: "mirage", label: "Mirage", thumbnail: "/thumbs/de_mirage.png" },
  { key: "overpass", label: "Overpass", thumbnail: "/thumbs/de_overpass.jpg" },
  { key: "dust2", label: "Dust2", thumbnail: "/thumbs/de_dust2.png" },
  { key: "nuke", label: "Nuke", thumbnail: "/thumbs/de_nuke.png" },
  { key: "cache", label: "Cache", thumbnail: "/thumbs/de_cache.png" },
  { key: "cobble", label: "Cobblestone", thumbnail: "/thumbs/de_cobble.jpg" },

] as const;

type MapKey = typeof MAPS[number]["key"];

export default function MapSelect() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0b0b",
        padding: "clamp(16px, 2.5vw, 40px)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(12px, 1.5vw, 20px)",
      }}
    >
    {/* header */}
    <div
    style={{
        textAlign: "center",
        padding: "18px 0 10px 0",
        userSelect: "none",
    }}
    >
    <div
        style={{
        fontFamily:
            '"CSGO Font", "Counter-Strike", "Roboto Condensed", Roboto, Arial, sans-serif',
        fontSize: "clamp(34px, 4vw, 64px)",
        fontWeight: 800,
        letterSpacing: "0.06em",
        color: "white",
        textTransform: "uppercase",
        textShadow: "0 10px 30px rgba(0,0,0,0.85)",
        lineHeight: 1.0,
        }}
    >
        Select a map
    </div>

<div
  style={{
    marginTop: 6,
    fontFamily:
      '"CSGO Font", "Counter-Strike", "Roboto Condensed", Roboto, Arial, sans-serif',
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    textShadow: "0 10px 30px rgba(0,0,0,0.85)",
  }}
>
  <span
    style={{
      fontSize: "clamp(12px, 1.2vw, 16px)",
      fontWeight: 800,
      color: "rgba(255,255,255,0.85)",
    }}
  >
    IGL Manager
  </span>

  <span
    style={{
      fontSize: "clamp(6px, 0.9vw, 13px)", // ≈ 3x menor

      fontWeight: 600,
      marginLeft: 8,
      color: "rgba(255,255,255,0.55)",
    }}
  >
    by gacsta
  </span>
</div>
    </div>

        <div
        className="map-grid"
        style={{
            flex: 1,
            display: "grid",
            gap: "clamp(12px, 1.6vw, 24px)",

            // ✅ FORÇA 3 colunas em telas largas
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",

            // ✅ Faz as linhas dividirem o espaço (2 linhas preenchendo a altura)
            gridAutoRows: "1fr",
            alignContent: "stretch",
        }}
        >
        {MAPS.map((map) => (
        <div key={map.key} style={{ padding: "clamp(8px, 1vw, 14px)" }}>
            <MapCard
                map={map}
                onClick={() => navigate(`/map/${map.key}`)}   // ✅ CORRETO
                />
        </div>
        ))}

        <style>
            {`
            /* telas médias: 2 colunas */
            @media (max-width: 1100px) {
                .map-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            }
            /* telas pequenas: 1 coluna */
            @media (max-width: 700px) {
                .map-grid { grid-template-columns: 1fr; }
            }
            `}
        </style>
        </div>     
    </div>
  );
}