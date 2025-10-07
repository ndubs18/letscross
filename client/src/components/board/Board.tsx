import { useMemo } from "react";
import { useCrossword } from "../../context/CrosswordContext.tsx";
import type { CellData, Coord } from "../../types/puzzle.ts";
import Cell from "../board/Cell.tsx";
import { ACROSS, DOWN } from "../../constants";

const Board = () => {
  const { puzzle, session, clueToCellsMap, cellsToClueMap } = useCrossword();
  const socketId = session.player.socketId;

  const currentWordCells = useMemo(() => {
    const player = session.players[socketId];
    let direction = player.direction;
    const { row, col } = player.cursor;

    // If the player cursor isn't somewhere on the board
    if (row >= 0 && col >= 0) {
      const cursorKeyId = `${row}:${col}`;
      let clueNumber = cellsToClueMap[cursorKeyId][direction];

      if (clueNumber !== undefined) {
        return clueToCellsMap[direction][clueNumber];
      }

      direction = direction === ACROSS ? DOWN : ACROSS;
      clueNumber = cellsToClueMap[cursorKeyId][direction];

      if (clueNumber !== undefined) {
        return clueToCellsMap[direction][clueNumber];
      }
    }
  }, [cellsToClueMap, clueToCellsMap, socketId, session.players]);
  return (
    <table>
      <tbody>
        {Array.from({ length: puzzle.rows }).map((_, r) => (
          <tr key={r}>
            {Array.from({ length: puzzle.cols }).map((_, c) => {
              const gridKey = `${r}:${c}`;
              const cell = puzzle.cells.find(
                (cell: CellData) => cell.row === r && cell.col === c,
              );
              return (
                <Cell
                  key={c}
                  value={session.gridState?.[gridKey] ?? ""}
                  gridKey={gridKey}
                  isBlock={cell?.isBlock}
                  letter={cell?.letter}
                  focused={
                    session.players[socketId].cursor.row === r &&
                    session.players[socketId].cursor.col === c
                  }
                  inWord={currentWordCells?.some(
                    (e: Coord) => e.col === c && e.row === r,
                  )}
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
