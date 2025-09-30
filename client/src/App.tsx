import "./App.css";
import Board from "./components/board/Board.tsx";

const puzzleData = {
  id: "puzzle-5x5-001",
  title: "Mini Crossword",
  author: "ChatGPT",
  rows: 5,
  cols: 5,
  cells: [
    { row: 0, col: 0, isBlock: false, letter: "C", number: 1 },
    { row: 0, col: 1, isBlock: false, letter: "A" },
    { row: 0, col: 2, isBlock: false, letter: "T" },
    { row: 0, col: 3, isBlock: false, letter: "A", number: 2 },
    { row: 0, col: 4, isBlock: false, letter: "R" },
    { row: 0, col: 5, isBlock: false, letter: "T" },

    { row: 1, col: 0, isBlock: false, letter: "A", number: 3 },
    { row: 1, col: 1, isBlock: false, letter: "P" },
    { row: 1, col: 2, isBlock: false, letter: "E" },
    { row: 1, col: 3, isBlock: true },
    { row: 1, col: 4, isBlock: false, letter: "T", number: 9 },
    { row: 1, col: 5, isBlock: false, letter: "O" },
    { row: 1, col: 6, isBlock: false, letter: "Y" },

    { row: 2, col: 0, isBlock: false, letter: "R", number: 4 },
    { row: 2, col: 1, isBlock: false, letter: "E" },
    { row: 2, col: 2, isBlock: false, letter: "D" },
    { row: 2, col: 3, isBlock: false, letter: "O", number: 5 },
    { row: 2, col: 4, isBlock: false, letter: "W" },
    { row: 2, col: 5, isBlock: false, letter: "L" },

    { row: 3, col: 0, isBlock: false, letter: "T", number: 6 },
    { row: 3, col: 1, isBlock: false, letter: "E" },
    { row: 3, col: 2, isBlock: false, letter: "A" },
    { row: 3, col: 3, isBlock: true },
    { row: 3, col: 4, isBlock: false, letter: "E", number: 10 },
    { row: 3, col: 5, isBlock: false, letter: "L" },
    { row: 3, col: 6, isBlock: false, letter: "K" },

    { row: 4, col: 0, isBlock: false, letter: "P", number: 7 },
    { row: 4, col: 1, isBlock: false, letter: "E" },
    { row: 4, col: 2, isBlock: false, letter: "N" },
    { row: 4, col: 3, isBlock: false, letter: "I", number: 8 },
    { row: 4, col: 4, isBlock: false, letter: "C" },
    { row: 4, col: 5, isBlock: false, letter: "E" },
  ],
  clues: {
    across: {
      "1": {
        number: 1,
        start: [0, 0],
        length: 3,
        text: "Feline pet",
        answer: "CAT",
      },
      "2": {
        number: 2,
        start: [0, 3],
        length: 3,
        text: "Creative work",
        answer: "ART",
      },
      "3": {
        number: 3,
        start: [1, 0],
        length: 3,
        text: "Primate",
        answer: "APE",
      },
      "9": {
        number: 9,
        start: [1, 4],
        length: 3,
        text: "Children’s plaything",
        answer: "TOY",
      },
      "4": {
        number: 4,
        start: [2, 0],
        length: 3,
        text: "Color of stop signs",
        answer: "RED",
      },
      "5": {
        number: 5,
        start: [2, 3],
        length: 3,
        text: "Nocturnal bird",
        answer: "OWL",
      },
      "6": {
        number: 6,
        start: [3, 0],
        length: 3,
        text: "Hot drink",
        answer: "TEA",
      },
      "10": {
        number: 10,
        start: [3, 4],
        length: 3,
        text: "Large deer",
        answer: "ELK",
      },
      "7": {
        number: 7,
        start: [4, 0],
        length: 3,
        text: "Writing tool",
        answer: "PEN",
      },
      "8": {
        number: 8,
        start: [4, 3],
        length: 3,
        text: "Frozen water",
        answer: "ICE",
      },
    },
    down: {
      "1": {
        number: 1,
        start: [0, 0],
        length: 5,
        text: "Opposite of out",
        answer: "CARTP",
      },
    },
  },
};

const sessionData = {
  id: "abc123",
  puzzleId: "puzzle-20250928-1",
  player: {
    socketId: "socketId1",
    name: "Nick",
    color: "#a3f",
  },
  createdAt: "2025-10-22",
  players: {
    socketId1: {
      name: "Nick",
      color: "#a3f",
      cursor: {
        row: undefined,
        col: undefined,
      },
    },
  },
  gridState: {},
};
function App() {
  return (
    <>
      <Board puzzle={puzzleData} session={sessionData} />
    </>
  );
}

export default App;
