import React, { useEffect, useState, useRef } from "react";
import type { ChangeEvent } from "react";
import "../../index.css";
import type { Coords } from "./BoardTypes.ts";
import type { Players } from "../../hooks/session/SessionTypes.ts";
import { useCrossword } from "../../context/CrosswordContext.tsx";

type CellProps = {
  value: string;
  gridKey: string;
  isBlock?: boolean;
  letter?: string;
  focused: boolean;
};

// const EMPTY_COLOR = "transparent";
// const FOCUS_COLOR = "black";
const CORRECT_COLOR = "#3bb143";
const INCORRECT_COLOR = "#ff0800";

const Cell = React.memo(
  ({ value, gridKey, isBlock, letter, focused }: CellProps) => {
    const { updateCell, updatePlayerPosition } = useCrossword();
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const cellRef = useRef<HTMLInputElement | null>(null);

    const [row, col] = gridKey.split(":");

    useEffect(() => {
      if (value === "" || isBlock) {
        return;
      }
      setIsCorrect(value === letter);
    }, [value, letter, isBlock]);

    useEffect(() => {
      if (cellRef.current) {
        let border = "grey";
        if (value !== "") {
          border = isCorrect ? CORRECT_COLOR : INCORRECT_COLOR;
        }

        cellRef.current.style.color = border;
      }
    }, [value, isCorrect]);

    const handleFocusBgColor = () => {
      if (cellRef.current) {
        cellRef.current.style.backgroundColor = "#c8d9ed";
      }
    };

    const onFocus = () => {
      updatePlayerPosition(Number(row), Number(col));
      handleFocusBgColor();
    };

    const onBlur = () => {
      if (cellRef.current) {
        cellRef.current.style.backgroundColor = "#FFFFFF";
      }
    };

    const onCellChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      updateCell(gridKey, value.toUpperCase());
    };
    return isBlock ? (
      <td
        className="cellBlock"
        style={{ background: "#000", width: 30, height: 30 }}
      />
    ) : (
      <td>
        <input
          className="cellInput"
          value={value}
          ref={cellRef}
          style={{
            width: 50,
            height: 50,
            textTransform: "uppercase",
            textAlign: "center",
            fontWeight: "700px",
            fontSize: "1.75rem",
            backgroundColor: "#FFFFFF",
          }}
          maxLength={1}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onCellChange}
        />
      </td>
    );
  },
);
export default Cell;
