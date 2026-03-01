import { useRef } from "react";

export type Player = {
  id: string;
  color: string;
  x: number;
  y: number;
};

type Props = {
  player: Player;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  selected: boolean;
  onCtrlSelect: (playerId: string) => void;
  onMove: (playerId: string, x: number, y: number) => void;
};

export default function PlayerIcon({ player, wrapperRef, selected, onCtrlSelect, onMove }: Props) {
  const draggingRef = useRef(false);

  const toLocalXY = (clientX: number, clientY: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return null;
    const rect = wrapper.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  return (
    <div
      role="button"
      tabIndex={0}
      title="Ctrl+Click to select drawing color"
      onPointerDown={(e) => {
        // Ctrl+Click seleciona a cor para desenho
        if (e.ctrlKey) {
          onCtrlSelect(player.id);
          return;
        }

        draggingRef.current = true;
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!draggingRef.current) return;
        const p = toLocalXY(e.clientX, e.clientY);
        if (!p) return;
        onMove(player.id, p.x, p.y);
      }}
      onPointerUp={() => {
        draggingRef.current = false;
      }}
      onPointerCancel={() => {
        draggingRef.current = false;
      }}
      style={{
        position: "absolute",
        left: player.x - 20,
        top: player.y - 20,
        width: 40,
        height: 40,
        borderRadius: 999,
        background: player.color,
        cursor: "grab",
        boxShadow: selected
          ? "0 0 0 2px rgba(255,255,255,0.95), 0 0 16px rgba(255,255,255,0.45)"
          : "0 8px 18px rgba(0,0,0,0.55)",
        border: selected ? "1px solid rgba(255,255,255,0.65)" : "1px solid rgba(0,0,0,0.35)",
        zIndex: 65,
        touchAction: "none",
      }}
    />
  );
}