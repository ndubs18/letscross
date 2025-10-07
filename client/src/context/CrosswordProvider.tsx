import { useMemo, useState } from "react";
import { CrosswordContext } from "./CrosswordContext";
import type {
  Session,
  UpdateCell,
  UpdatePlayerPosition,
  ClueToCells,
  CellsToClue,
} from "./CrosswordContextTypes.ts";
import type { Puzzle, CellData } from "../types/puzzle.ts";
import { ACROSS, DOWN } from "../constants";
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

  const clueToCellsMap = useMemo(() => {
    const clueToCells: ClueToCells = {
      across: {},
      down: {},
    };
    //build across map
    for (const [num, word] of Object.entries(puzzle.clues.across)) {
      const [r, c] = word.start;
      const length = word.length;
      const coordsToAdd = [];
      for (let i = 0; i < length; i++) {
        coordsToAdd.push({ row: r, col: c + i });
      }
      clueToCells.across[Number(num)] = coordsToAdd;
    }

    //build down map
    for (const [num, word] of Object.entries(puzzle.clues.down)) {
      const [r, c] = word.start;
      const length = word.length;
      const coordsToAdd = [];
      for (let i = 0; i < length; i++) {
        coordsToAdd.push({ row: r + i, col: c });
      }
      clueToCells.down[Number(num)] = coordsToAdd;
    }

    return clueToCells;
  }, [puzzle]);

  const cellsToClueMap = useMemo(() => {
    const cellsToClueMap: CellsToClue = {};

    //across
    for (const [clueNum, coords] of Object.entries(clueToCellsMap.across)) {
      for (const { row, col } of coords) {
        const gridKey = `${row}:${col}`;
        if (!cellsToClueMap[gridKey]) {
          cellsToClueMap[gridKey] = {};
        }
        cellsToClueMap[gridKey].across = Number(clueNum);
      }
    }
    //down
    for (const [clueNum, coords] of Object.entries(clueToCellsMap.down)) {
      for (const { row, col } of coords) {
        const gridKey = `${row}:${col}`;
        if (!cellsToClueMap[gridKey]) {
          cellsToClueMap[gridKey] = {};
        }
        cellsToClueMap[gridKey].down = Number(clueNum);
      }
    }
    return cellsToClueMap;
  }, [clueToCellsMap.across, clueToCellsMap.down]);

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
          cursor: {
            row: row,
            col: col,
          },
        },
      },
    }));
  };

  const changePlayerDirection = () => {
    const socketId = session.player.socketId;
    const direction = session.players[socketId].direction;
    const newDirection = direction === ACROSS ? DOWN : ACROSS;
    console.log("running");
    setSession((prev) => ({
      ...prev,
      players: {
        ...prev.players,
        [socketId]: {
          ...prev.players[socketId],
          direction: newDirection,
        },
      },
    }));
  };

  return (
    <CrosswordContext.Provider
      value={{
        puzzle,
        session,
        clueToCellsMap,
        cellsToClueMap,
        updateCell,
        updatePlayerPosition,
        changePlayerDirection,
      }}
    >
      {children}
    </CrosswordContext.Provider>
  );
}
