import { useCrossword } from "../../context/CrosswordContext.tsx";
import type { CellData } from "../../types/puzzle.ts";
import Cell from "../board/Cell.tsx";

const Board = () => {
  const { puzzle, session } = useCrossword();
  const socketId = session.player.socketId;

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
