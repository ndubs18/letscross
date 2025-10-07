
import type { Puzzle, Coord } from "../types/puzzle.ts";

type SocketId = string;

type Player = {
	socketId: SocketId;
	name: string,
	color: string,
};

type PlayerState = {
	name: string,
	color: string,
	cursor: Coord,
	direction: 'down' | 'across'
};

type Players = Record<SocketId, PlayerState>;
type CellState = Record<string, string>
type ClueToCells = Record<string, Record<number, Coord[]>>;
type CellsToClue = Record<string, { across?: number, down?: number }>;

// Function types
type UpdateCell = (gridKey: string, letter: string) => void;
type UpdatePlayerPosition = (row: number, col: number) => void;
type ChangePlayerDirection = () => void

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
	clueToCellsMap: ClueToCells,
	cellsToClueMap: CellsToClue,
	updateCell: UpdateCell,
	updatePlayerPosition: UpdatePlayerPosition,
	changePlayerDirection: ChangePlayerDirection,
};

export type { CrosswordContextType, Session, Players, CellState, UpdateCell, UpdatePlayerPosition, ClueToCells, CellsToClue };
