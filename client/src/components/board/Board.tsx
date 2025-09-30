import React, { useState } from "react";
import type { Grid, Puzzle, Coords } from "./BoardTypes.ts";
import type { Session, Players } from "../../hooks/session/SessionTypes.ts";
import Cell from "../board/Cell.tsx";

// TODO: Separate session and puzzle types
type BoardProps = {
  puzzle: Puzzle;
  session: Session;
};
const initGridData: {
  [gridKey: string]: string;
} = {};

const Board = ({ puzzle, session }: BoardProps) => {
  React.useMemo(() => {
    puzzle.cells.forEach((cell) => {
      const gridKey = `${cell.row}:${cell.col}`;
      initGridData[gridKey] = "";
    });
  }, [puzzle.cells]);
  const [players, setPlayers] = useState<Players>(session.players);
  const [grid, setGrid] = useState<Grid>(initGridData);

  const socketId = session.player.socketId;
  const updateGrid = (gridKey: string, value: string) => {
    setGrid((prevGrid) => ({
      ...prevGrid,
      [gridKey]: value,
    }));
  };

  const updatePlayerPos = (row: number, col: number) => {
    setPlayers((prev: Players) => {
      return {
        ...prev,
        [socketId]: {
          ...prev[socketId],
          row: row,
          col: col,
        },
      };
    });
  };

  return (
    <table>
      <tbody>
        {Array.from({ length: puzzle.rows }).map((_, r) => (
          <tr key={r}>
            {Array.from({ length: puzzle.cols }).map((_, c) => {
              const gridKey = `${r}:${c}`;
              const cell = puzzle.cells.find(
                (cell) => cell.row === r && cell.col === c,
              );
              return (
                <Cell
                  key={c}
                  value={grid[gridKey] ?? ""}
                  gridKey={gridKey}
                  isBlock={cell?.isBlock}
                  letter={cell?.letter}
                  focused={
                    session.players[socketId].cursor.row === r &&
                    session.players[socketId].cursor.col === c
                  }
                  players={session.players}
                  updateGrid={updateGrid}
                  updatePlayerPos={updatePlayerPos}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Board;
