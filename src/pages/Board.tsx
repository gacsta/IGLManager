import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";

import MapContainer from "../components/board/MapContainer";
import DrawingCanvas from "../components/board/DrawingCanvas";
import Toolbar from "../components/board/Toolbar";
import PlayerSelector, { type Player } from "../components/board/PlayerSelector";
import GrenadeLayer, { type Grenade, type GrenadeType } from "../components/board/GrenadeLayer";

type Point = { x: number; y: number };
type Stroke = { color: string; points: Point[] };

const ALLOWED_KEYS = new Set(["mirage", "overpass", "dust2", "nuke", "cache", "cobble"]);

const PLAYERS: { id: string; color: string }[] = [
  { id: "p1", color: "#ff8a00" }, // laranja
  { id: "p2", color: "#ffd400" }, // amarelo
  { id: "p3", color: "#2f7cff" }, // azul
  { id: "p4", color: "#a855f7" }, // roxo
  { id: "p5", color: "#22c55e" }, // verde
];

export default function Board() {
  const { mapKey } = useParams<{ mapKey: string }>();
  const isAllowed = mapKey ? ALLOWED_KEYS.has(mapKey) : false;

  const imageUrl = useMemo(() => {
    if (!mapKey) return "";
    return `/maps/de_${mapKey}.jpg`;
  }, [mapKey]);

  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [imageUrl]);

  // ===== Tool / Drawing state =====
  const [tool, setTool] = useState<"pen">("pen");
  const [strokes, setStrokes] = useState<Stroke[]>([]);

  // ===== Grenades state (✅ dentro do componente) =====
  const [selectedGrenade, setSelectedGrenade] = useState<GrenadeType | null>(null);
  const [grenades, setGrenades] = useState<Grenade[]>([]);

  // ===== Map container ref =====
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // ===== Players state =====
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(PLAYERS[0].id);
  const [players, setPlayers] = useState<Player[]>(() => {
    const startX = 960;
    const startY = 280;
    const gap = 46;

    return PLAYERS.map((p, idx) => ({
      id: p.id,
      color: p.color,
      x: startX,
      y: startY + idx * gap,
    }));
  });

  // Ajusta posições iniciais da paleta quando o mapa carregar / resize (se ainda “colada”)
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const placePalette = () => {
      const rect = wrapper.getBoundingClientRect();
      const x = rect.width - 36;
      const y0 = rect.height * 0.35;
      const gap = 44;

      setPlayers((prev) => {
        const allNearRight = prev.every((pl) => pl.x > rect.width * 0.7);
        if (!allNearRight) return prev;

        return prev.map((pl, idx) => ({
          ...pl,
          x,
          y: y0 + idx * gap,
        }));
      });
    };

    placePalette();
    window.addEventListener("resize", placePalette);
    return () => window.removeEventListener("resize", placePalette);
  }, [imageUrl]);

  const selectedColor = useMemo(() => {
    const found = players.find((p) => p.id === selectedPlayerId);
    return found?.color ?? "white";
  }, [players, selectedPlayerId]);

  if (!isAllowed) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", color: "white", padding: 24 }}>
        Mapa inválido. <Link to="/">Voltar</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Link
        to="/"
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          color: "white",
          textDecoration: "none",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 12,
          padding: "8px 12px",
          background: "rgba(0,0,0,0.35)",
          zIndex: 50,
        }}
      >
        ← Voltar
      </Link>

      <Toolbar
        tool={tool}
        setTool={setTool}
        players={players}
        selectedPlayerId={selectedPlayerId}
        setSelectedPlayerId={setSelectedPlayerId}
        selectedGrenade={selectedGrenade}
        setSelectedGrenade={setSelectedGrenade}
      />

      <MapContainer
        wrapperRef={wrapperRef}
        imageUrl={imageUrl}
        failed={failed}
        onImageError={() => setFailed(true)}
        // onMapPointerDown={(e: React.PointerEvent<HTMLDivElement>) => {
        //   if (!selectedGrenade) return;

        //   const wrapper = wrapperRef.current;
        //   if (!wrapper) return;

        //   const rect = wrapper.getBoundingClientRect();
        //   const x = e.clientX - rect.left;
        //   const y = e.clientY - rect.top;

        //   setGrenades((prev) => [
        //     ...prev,
        //     { id: crypto.randomUUID(), type: selectedGrenade, x, y },
        //   ]);

        //   setSelectedGrenade(null);
        // }}
      >
        {/* desenho */}
        <DrawingCanvas
          wrapperRef={wrapperRef}
          strokes={strokes}
          setStrokes={setStrokes}
          strokeColor={selectedColor}
          tool={tool}
          clearOnSpace={true}
        />

        {/* ✅ granadas por cima do desenho */}
        <GrenadeLayer wrapperRef={wrapperRef} grenades={grenades} setGrenades={setGrenades} />

        {/* players por cima */}
        <PlayerSelector
          wrapperRef={wrapperRef}
          players={players}
          setPlayers={setPlayers}
          selectedPlayerId={selectedPlayerId}
          setSelectedPlayerId={setSelectedPlayerId}

        />

      </MapContainer>
    </div>
  );
}