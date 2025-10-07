import React, { useEffect, useState, useRef } from "react";
import type { ChangeEvent } from "react";
import "../../index.css";
import { useCrossword } from "../../context/CrosswordContext.tsx";

type CellProps = {
  value: string;
  gridKey: string;
  isBlock?: boolean;
  letter?: string;
  focused: boolean;
  inWord: boolean | undefined;
};

const NOT_IN_WORD_COLOR = "#FFFFFF";
const FOCUS_COLOR = "#83AFF0";
const IN_WORD_COLOR = "#C8D9ED";
const CORRECT_COLOR = "#3bb143";
const INCORRECT_COLOR = "#ff0800";

const Cell = React.memo(
  ({ value, gridKey, isBlock, letter, focused, inWord }: CellProps) => {
    const { updateCell, updatePlayerPosition, changePlayerDirection } =
      useCrossword();
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [clickCount, setClickCount] = useState(0);
    const clickTimer = useRef<null | number>(null);
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
        let fontColor = "grey";
        if (value !== "") {
          fontColor = isCorrect ? CORRECT_COLOR : INCORRECT_COLOR;
        }
        cellRef.current.style.color = fontColor;
      }
    }, [value, isCorrect]);

    useEffect(() => {
      if (!focused) {
        return;
      }
      if (cellRef.current) {
        if (cellRef.current.style.backgroundColor !== FOCUS_COLOR) {
          cellRef.current.focus();
          cellRef.current.style.backgroundColor = FOCUS_COLOR;
        }
      }
    }, [focused]);

    const handleFocusBgColor = () => {
      if (cellRef.current) {
        cellRef.current.style.backgroundColor = FOCUS_COLOR;
      }
    };

    const onFocus = () => {
      updatePlayerPosition(Number(row), Number(col));
      handleFocusBgColor();
    };

    const onBlur = () => {
      if (cellRef.current) {
        if (!inWord) {
          cellRef.current.style.backgroundColor = NOT_IN_WORD_COLOR;
        } else {
          cellRef.current.style.backgroundColor = IN_WORD_COLOR;
        }
      }
    };

    const handleDoubleClick = () => {
      setClickCount((prev) => {
        const next = prev + 1;
        if (next === 2) {
          console.log("double");
          clearTimeout(clickTimer.current!);
          queueMicrotask(() => changePlayerDirection());
          return 0;
        }
        clickTimer.current = setTimeout(() => {
          setClickCount(0);
        }, 250);
        return next;
      });
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
          type="text"
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
            backgroundColor: inWord ? IN_WORD_COLOR : NOT_IN_WORD_COLOR,
          }}
          maxLength={1}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onCellChange}
          onClick={handleDoubleClick}
        />
      </td>
    );
  },
);
export default Cell;
