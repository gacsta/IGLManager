import type { ReactNode, RefObject } from "react";


type Props = {
  wrapperRef: RefObject<HTMLDivElement>;
  imageUrl: string;
  failed: boolean;
  onImageError: () => void;
  onImageLoad?: () => void;
  children?: ReactNode; // overlays: canvas, players etc
};

export default function MapContainer({
  wrapperRef,
  imageUrl,
  failed,
  onImageError,
  onImageLoad,
  children,
}: Props) {
  return (
    <div
      style={{
        width: "min(100vw, 100vh)",
        height: "min(100vw, 100vh)",
        position: "relative",
      }}
      ref={wrapperRef}
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
          {children}
        </>
      ) : (
        <div style={{ color: "white", padding: 24 }}>Falhou ao carregar: {imageUrl}</div>
      )}
    </div>
  );
}