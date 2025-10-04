import { createContext, useContext } from "react";
import type { Session, UpdateCell } from "./CrosswordContextTypes.ts";
import type { Puzzle } from "../types/puzzle.ts";

export const CrosswordContext = createContext<CrosswordContextType | null>(
  null,
);

export const useCrossword = () => {
  const ctx = useContext(CrosswordContext);
  if (!ctx)
    throw new Error("useCrossword must be used within CrosswordProvider");
  return ctx;
};
