import { createContext, useContext } from "react";
import type { CrosswordContextType } from "./CrosswordContextTypes.ts";

export const CrosswordContext = createContext<CrosswordContextType | null>(
  null,
);

export const useCrossword = () => {
  const ctx = useContext(CrosswordContext);
  if (!ctx)
    throw new Error("useCrossword must be used within CrosswordProvider");
  return ctx;
};
