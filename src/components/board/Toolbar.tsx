import type { Player } from "./PlayerSelector";

type GrenadeType = "smoke" | "molotov";

type Props = {
  tool: "pen";
  setTool: (t: "pen") => void;

  players: Player[];
  selectedPlayerId: string;
  setSelectedPlayerId: (id: string) => void;

  selectedGrenade: GrenadeType | null;
  setSelectedGrenade: (g: GrenadeType | null) => void;
};

export default function Toolbar({
  tool,
  setTool,
  players,
  selectedPlayerId,
  setSelectedPlayerId,
  selectedGrenade,
  setSelectedGrenade,
}: Props) {
  return (
    <div
      style={{
        position: "absolute",
        right: 18,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 60,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: 12,
        borderRadius: 16,
        background: "rgba(0,0,0,0.45)",
        border: "1px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(10px)",
        alignItems: "center",
      }}
    >
      {/* Pencil */}
      <button
        onClick={() => {
          setTool("pen");
          setSelectedGrenade(null); // opcional: desmarca granada ao voltar pro lápis
        }}
        title="Pencil"
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          cursor: "pointer",
          border: tool === "pen" ? "2px solid rgba(255,255,255,0.95)" : "1px solid rgba(255,255,255,0.3)",
          background: tool === "pen" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.25)",
          color: "white",
          fontSize: 20,
          display: "grid",
          placeItems: "center",
        }}
      >
        ✏
      </button>

      {/* Player palette under pencil */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
        {players.map((p) => {
          const selected = p.id === selectedPlayerId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPlayerId(p.id)}
              title="Select draw color"
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                cursor: "pointer",
                background: p.color,
                border: selected ? "2px solid rgba(255,255,255,0.95)" : "1px solid rgba(0,0,0,0.45)",
                boxShadow: selected
                  ? "0 0 0 2px rgba(255,255,255,0.35), 0 0 16px rgba(255,255,255,0.35)"
                  : "0 10px 20px rgba(0,0,0,0.55)",
              }}
            />
          );
        })}
      </div>

      {/* Grenades */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
        <button
          onClick={() => setSelectedGrenade(selectedGrenade === "smoke" ? null : "smoke")}
          title="Smoke"
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: selectedGrenade === "smoke" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)",
            border: "1px solid rgba(255,255,255,0.4)",
            fontSize: 18,
            cursor: "pointer",
            color: "white",
          }}
        >
          💨
        </button>

        <button
          onClick={() => setSelectedGrenade(selectedGrenade === "molotov" ? null : "molotov")}
          title="Molotov"
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: selectedGrenade === "molotov" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)",
            border: "1px solid rgba(255,255,255,0.4)",
            fontSize: 18,
            cursor: "pointer",
            color: "white",
          }}
        >
          🔥
        </button>
      </div>

      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, textAlign: "center", marginTop: 4 }}>
        Space<br />clears
      </div>
    </div>
  );
}