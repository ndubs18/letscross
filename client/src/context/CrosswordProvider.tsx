import { useMemo, useState } from "react";
import { CrosswordContext } from "./CrosswordContext";
import type {
  Session,
  CellState,
  UpdateCell,
  UpdatePlayerPosition,
} from "./CrosswordContextTypes.ts";
import type { Puzzle, CellData } from "../types/puzzle.ts";
const initialSessionData: Session = {
  id: "abc123",
  puzzleId: "puzzle-20250928-1",
  player: {
    socketId: "socketId1",
    name: "Nick",
    color: "#a3f",
  },
  createdAt: "2025-10-22",
  players: {
    socketId1: {
      name: "Nick",
      color: "#a3f",
      direction: "across",
      cursor: {
        row: -1,
        col: -1,
      },
    },
  },
  gridState: {},
};
export default function CrosswordProvider({
  puzzle,
  children,
}: {
  puzzle: Puzzle;
  children: React.ReactNode;
}) {
  // Initialize grid state
  useMemo(() => {
    puzzle.cells.forEach((cell: CellData) => {
      const gridKey = `${cell.row}:${cell.col}`;
      initialSessionData.gridState[gridKey] = "";
    });
  }, [puzzle.cells]);

  const [session, setSession] = useState<Session>(initialSessionData);

  const initializeGrid = (initGridState: CellState) => {
    setSession((prev) => ({
      ...prev,
      gridState: initGridState,
    }));
  };

  const updateCell: UpdateCell = (gridKey, letter) => {
    setSession((prev) => ({
      ...prev,
      gridState: {
        ...prev.gridState,
        [gridKey]: letter,
      },
    }));
  };

  const updatePlayerPosition: UpdatePlayerPosition = (row, col) => {
    const socketId = session.player.socketId;
    setSession((prev) => ({
      ...prev,
      players: {
        ...prev.players,
        [socketId]: {
          ...prev.players[socketId],
          row: row,
          col: col,
        },
      },
    }));
  };

  return (
    <CrosswordContext.Provider
      value={{
        puzzle,
        session,
        updateCell,
        initializeGrid,
        updatePlayerPosition,
      }}
    >
      {children}
    </CrosswordContext.Provider>
  );
}
