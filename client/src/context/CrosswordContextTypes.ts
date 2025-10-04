
import type { Puzzle, Coords } from "../types/puzzle.ts"

type SocketId = string;

type Player = {
	socketId: SocketId;
	name: string;
	color: string;
};

type PlayerState = {
	name: string;
	color: string;
	cursor: Coords;
};

type Players = Record<SocketId, PlayerState>;

type UpdateCell = (row: number, col: number, letter: string) => void;

type CellState = Record<string, string>

type Session = {
	id: string;
	player: Player;
	puzzleId: string;
	createdAt: string;
	players: Players;
	// key will be row:col and value will be the letter
	gridState: CellState;
};

type CrosswordContextType = {
	puzzle: Puzzle;
	session: Session;
	updateCell: UpdateCell;
};

export type { CrosswordContextType, Session, Players, CellState, UpdateCell };
