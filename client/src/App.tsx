import "./App.css";
import Board from "./components/board/Board.tsx";
import CrosswordProvider from "./context/CrosswordProvider.tsx";

const puzzleData = {
  id: "puzzle-5x5-001",
  title: "Mini Crossword",
  author: "ChatGPT",
  rows: 5,
  cols: 5,
  cells: [
    // Row 0
    { row: 0, col: 0, isBlock: false, letter: "A", number: 1 },
    { row: 0, col: 1, isBlock: false, letter: "T" },
    { row: 0, col: 2, isBlock: false, letter: "L" },
    { row: 0, col: 3, isBlock: false, letter: "A" },
    { row: 0, col: 4, isBlock: false, letter: "S" },

    // Row 1
    { row: 1, col: 0, isBlock: true },
    { row: 1, col: 1, isBlock: false, letter: "R", number: 2 },
    { row: 1, col: 2, isBlock: false, letter: "E" },
    { row: 1, col: 3, isBlock: false, letter: "P" },
    { row: 1, col: 4, isBlock: true },

    // Row 2
    { row: 2, col: 0, isBlock: false, letter: "R", number: 3 },
    { row: 2, col: 1, isBlock: false, letter: "E" },
    { row: 2, col: 2, isBlock: false, letter: "A" },
    { row: 2, col: 3, isBlock: false, letter: "P" },
    { row: 2, col: 4, isBlock: false, letter: "S" },

    // Row 3
    { row: 3, col: 0, isBlock: true },
    { row: 3, col: 1, isBlock: false, letter: "E", number: 4 },
    { row: 3, col: 2, isBlock: false, letter: "S" },
    { row: 3, col: 3, isBlock: false, letter: "L" },
    { row: 3, col: 4, isBlock: true },

    // Row 4
    { row: 4, col: 0, isBlock: false, letter: "E", number: 5 },
    { row: 4, col: 1, isBlock: false, letter: "S" },
    { row: 4, col: 2, isBlock: false, letter: "T" },
    { row: 4, col: 3, isBlock: false, letter: "E" },
    { row: 4, col: 4, isBlock: false, letter: "R" },
  ],

  clues: {
    across: {
      "1": {
        number: 1,
        start: [0, 0],
        length: 5,
        text: "map",
        answer: "ATLAS",
      },
      "2": {
        number: 2,
        start: [1, 1],
        length: 3,
        text: "Gym count",
        answer: "REP",
      },
      "3": {
        number: 3,
        start: [2, 0],
        length: 5,
        text: "____ the benefits",
        answer: "REAPS",
      },
      "4": {
        number: 4,
        start: [3, 1],
        length: 3,
        text: "Language course for foreigners",
        answer: "ESL",
      },
      "5": {
        number: 5,
        start: [4, 0],
        length: 5,
        text: "Chemical compound when combining an acid and alcohol",
        answer: "ESTER",
      },
    },

    down: {
      "6": {
        number: 6,
        start: [0, 1],
        length: 5,
        text: "Tall and good source of shade",
        answer: "TREES",
      },
      "7": {
        number: 7,
        start: [0, 2],
        length: 5,
        text: "Smallest amount",
        answer: "LEAST",
      },
      "8": {
        number: 8,
        start: [0, 3],
        length: 5,
        text: "Red fruit",
        answer: "APPLE",
      },
    },
  },
};

// const sessionData = {
//   id: "abc123",
//   puzzleId: "puzzle-20250928-1",
//   player: {
//     socketId: "socketId1",
//     name: "Nick",
//     color: "#a3f",
//   },
//   createdAt: "2025-10-22",
//   players: {
//     socketId1: {
//       name: "Nick",
//       color: "#a3f",
//       cursor: {
//         row: -1,
//         col: -1,
//       },
//     },
//   },
//   gridState: {},
// };
function App() {
  return (
    <CrosswordProvider puzzle={puzzleData}>
      <Board />
    </CrosswordProvider>
  );
}

export default App;
