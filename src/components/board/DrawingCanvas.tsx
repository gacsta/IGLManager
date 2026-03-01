import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

export type Point = { x: number; y: number };
export type Stroke = { color: string; points: Point[] };

type Props = {
  wrapperRef: RefObject<HTMLDivElement | null>;
  strokes: Stroke[];
  setStrokes: React.Dispatch<React.SetStateAction<Stroke[]>>;
  strokeColor: string; // cor do desenho (vem do PlayerSelector)
  tool: "pen";
  clearOnSpace?: boolean;
};

export default function DrawingCanvas({
  wrapperRef,
  strokes,
  setStrokes,
  strokeColor,
  tool,
  clearOnSpace = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const redrawAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;

    for (const s of strokes) {
      if (s.points.length < 2) continue;
      ctx.strokeStyle = s.color;

      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) {
        ctx.lineTo(s.points[i].x, s.points[i].y);
      }
      ctx.stroke();
    }
  };

  const resizeCanvasToWrapper = () => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const rect = wrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // desenhar em coordenadas CSS
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    redrawAll();
  };

  useEffect(() => {
    redrawAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokes]);

  useEffect(() => {
    resizeCanvasToWrapper();
    window.addEventListener("resize", resizeCanvasToWrapper);
    return () => window.removeEventListener("resize", resizeCanvasToWrapper);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!clearOnSpace) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setStrokes([]); // limpa permanentemente
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [clearOnSpace, setStrokes]);

  const getPointFromEvent = (e: React.PointerEvent<HTMLCanvasElement>): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (tool !== "pen") return;

    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    const p = getPointFromEvent(e);
    if (!p) return;

    setIsDrawing(true);
    setStrokes((prev) => [...prev, { color: strokeColor, points: [p] }]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const p = getPointFromEvent(e);
    if (!p) return;

    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const last = next[next.length - 1];
      next[next.length - 1] = { ...last, points: [...last.points, p] };
      return next;
    });
  };

  const handlePointerUp = () => setIsDrawing(false);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        touchAction: "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    />
  );
}