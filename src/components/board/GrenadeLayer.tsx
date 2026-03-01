import { useRef } from "react";

export type GrenadeType = "smoke" | "molotov";

export type Grenade = {
  id: string;
  type: GrenadeType;
  x: number;
  y: number;
};

type Props = {
  wrapperRef: React.RefObject<HTMLDivElement>;
  grenades: Grenade[];
  setGrenades: React.Dispatch<React.SetStateAction<Grenade[]>>;
};

export default function GrenadeLayer({
  wrapperRef,
  grenades,
  setGrenades,
}: Props) {
  const draggingRef = useRef<string | null>(null);

  const toLocalXY = (clientX: number, clientY: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return null;
    const rect = wrapper.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const moveGrenade = (id: string, x: number, y: number) => {
    setGrenades((prev) =>
      prev.map((g) => (g.id === id ? { ...g, x, y } : g))
    );
  };

  return (
    <>
      {grenades.map((g) => (
        <div
          key={g.id}
          onPointerDown={(e) => {
            draggingRef.current = g.id;
            (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!draggingRef.current) return;
            const p = toLocalXY(e.clientX, e.clientY);
            if (!p) return;
            moveGrenade(g.id, p.x, p.y);
          }}
          onPointerUp={() => (draggingRef.current = null)}
          onPointerCancel={() => (draggingRef.current = null)}
          style={{
            position: "absolute",
            left: g.x - 14,
            top: g.y - 14,
            width: 28,
            height: 28,
            borderRadius: 999,
            display: "grid",
            placeItems: "center",
            fontSize: 16,
            cursor: "grab",
            background:
              g.type === "smoke"
                ? "rgba(120,120,120,0.9)"
                : "rgba(255,90,0,0.9)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.6)",
            zIndex: 64,
            touchAction: "none",
          }}
        >
          {g.type === "smoke" ? "💨" : "🔥"}
        </div>
      ))}
    </>
  );
}