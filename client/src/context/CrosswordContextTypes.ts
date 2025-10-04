
import type { Puzzle, Coords } from "../types/puzzle.ts"

type SocketId = string;

type Player = {
	socketId: SocketId;
	name: string,
	color: string,
};

type PlayerState = {
	name: string,
	color: string,
	cursor: Coords,
	direction: 'down' | 'across'
};

type Players = Record<SocketId, PlayerState>;
type UpdateCell = (gridKey: string, letter: string) => void;
type UpdatePlayerPosition = (row: number, col: number) => void;
type CellState = Record<string, string>

type Session = {
	id: string,
	player: Player,
	puzzleId: string,
	createdAt: string,
	players: Players,
	// key will be row:col and value will be the letter
	gridState: CellState,
};

type CrosswordContextType = {
	puzzle: Puzzle,
	session: Session,
	updateCell: UpdateCell,
	updatePlayerPosition: UpdatePlayerPosition,
};

export type { CrosswordContextType, Session, Players, CellState, UpdateCell, UpdatePlayerPosition };
