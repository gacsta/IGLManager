import type { ReactNode, RefObject } from "react";

type Props = {
  wrapperRef: RefObject<HTMLDivElement | null>;
  imageUrl: string;
  failed: boolean;
  onImageError: () => void;
  onImageLoad?: () => void;
  children?: ReactNode;

  // ✅ precisa existir para o Board compilar
  onMapPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void;
};

export default function MapContainer({
  wrapperRef,
  imageUrl,
  failed,
  onImageError,
  onImageLoad,
  children,
  onMapPointerDown,
}: Props) {
  return (
    <div
      ref={wrapperRef}
      style={{
        width: "min(100vw, 100vh)",
        height: "min(100vw, 100vh)",
        position: "relative",
      }}
    >
      {!failed ? (
        <>
          <img
            src={imageUrl}
            alt="map"
            onError={onImageError}
            onLoad={onImageLoad}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />

          {/* overlay que captura clique do mapa */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 60,
              background: "transparent",
              touchAction: "none",
              pointerEvents: onMapPointerDown ? "auto" : "none",
            }}
            onPointerDown={onMapPointerDown}
          />

          {children}
        </>
      ) : (
        <div style={{ color: "white", padding: 24 }}>
          Falhou ao carregar: {imageUrl}
        </div>
      )}
    </div>
  );
}