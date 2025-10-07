// Single clue type
type Clue = {
	number: number;            // The clue number (1, 2, 3, …)
	start: [number, number];   // [row, column] starting cell
	length: number;            // Number of letters
	text: string;              // Clue text
	answer: string;            // The solution
};

// Collection of clues (by number)
type ClueMap = {
	[clueNumber: number]: Clue;
};

// Full clues object containing across and down
type Clues = {
	across: ClueMap;
	down: ClueMap;
};

type CellData = {
	row: number,
	col: number,
	isBlock?: boolean,
	letter?: string,
	number?: number,
}
type Puzzle = {
	id: string,
	title: string,
	author: string,
	rows: number,
	cols: number,
	cells: CellData[],
	// TODO: We need to type clues
	clues: Clues,
}

type Coord = {
	row: number,
	col: number
}

export type { CellData, Puzzle, Coord };
