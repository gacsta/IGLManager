import { useEffect, useRef, useState } from "react";

type Props = {
  imageUrl: string;
};

export function ResponsiveSquareMap({ imageUrl }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    function updateSize() {
      const minDimension = Math.min(window.innerWidth, window.innerHeight);
      setSize(minDimension);
    }

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        src={imageUrl}
        alt="Map"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}