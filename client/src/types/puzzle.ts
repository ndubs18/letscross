type CellData = {
	row: number,
	col: number,
	isBlock: boolean,
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
	clues: any,
}

type Coords = {
	row: number,
	col: number
}

export type { CellData, Puzzle, Coords };
