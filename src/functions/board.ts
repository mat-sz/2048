import { Direction } from '../types/Direction';

export type BoardType = number[];

export function newTileValue() {
  return Math.random() > 0.1 ? 2 : 4;
}

export function newTile(board: BoardType): BoardType {
  while (true) {
    const index = Math.floor(Math.random() * board.length);
    if (board[index] === 0) {
      board[index] = newTileValue();
      break;
    }
  }

  return board;
}

export function initializeBoard(boardSize: number): BoardType {
  const board = new Array(boardSize ** 2).fill(0);
  return [...newTile(board)];
}

export function updateBoard(
  board: BoardType,
  boardSize: number,
  direction: Direction
): BoardType {
  return [...board];
}
