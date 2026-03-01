import PlayerIcon from "./PlayerIcon";

export type Player = {
  id: string;
  color: string;
  x: number;
  y: number;
};

type Props = {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  selectedPlayerId: string;
  setSelectedPlayerId: (id: string) => void;
};

export default function PlayerSelector({
  wrapperRef,
  players,
  setPlayers,
  selectedPlayerId,
  setSelectedPlayerId,
}: Props) {
  const movePlayer = (id: string, x: number, y: number) => {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, x, y } : p)));
  };

  return (
    <>
      {players.map((p) => (
        <PlayerIcon
          key={p.id}
          player={p}
          wrapperRef={wrapperRef}
          selected={p.id === selectedPlayerId}
          onCtrlSelect={setSelectedPlayerId}
          onMove={movePlayer}
        />
      ))}
    </>
  );
}