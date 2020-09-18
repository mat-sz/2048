import { Direction } from '../types/Direction';

export type BoardType = number[];

export function newTileValue() {
  return Math.random() > 0.1 ? 2 : 4;
}

function containsEmpty(board: BoardType): boolean {
  return board.find(value => value === 0) === 0;
}

export function newTile(board: BoardType): BoardType {
  if (!containsEmpty(board)) {
    return board;
  }

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

function rotateBoard(
  board: BoardType,
  direction: Direction,
  undo = false
): BoardType {
  // No need to rotate, it's already in the correct orientation.
  if (direction === Direction.DOWN) {
    return [...board];
  }

  const boardSize = Math.sqrt(board.length);
  const newBoard = new Array(board.length);

  if (undo) {
    switch (direction) {
      case Direction.LEFT:
        direction = Direction.RIGHT;
        break;
      case Direction.RIGHT:
        direction = Direction.LEFT;
        break;
    }
  }

  for (let i = 0; i < board.length; i++) {
    let x = i % boardSize;
    let y = Math.floor(i / boardSize);

    switch (direction) {
      case Direction.LEFT:
        {
          const temp = y;
          y = boardSize - 1 - x;
          x = temp;
        }
        break;
      case Direction.RIGHT:
        {
          const temp = x;
          x = boardSize - 1 - y;
          y = temp;
        }
        break;
      case Direction.UP:
        x = boardSize - 1 - x;
        y = boardSize - 1 - y;
        break;
    }

    newBoard[y * boardSize + x] = board[i];
  }

  return newBoard;
}

export interface BoardUpdate {
  board: BoardType;
  scoreIncrease: number;
}

export function updateBoard(
  board: BoardType,
  direction: Direction
): BoardUpdate {
  const boardSize = Math.sqrt(board.length);

  // First the board is rotated so gravity can work downwards.
  board = rotateBoard(board, direction);

  let changed = false;
  let scoreIncrease = 0;

  // Going from second last to the first row on the rotated board.
  for (let row = boardSize - 2; row >= 0; row--) {
    for (let col = 0; col < boardSize; col++) {
      let i = row * boardSize + col;
      let below = i + boardSize;
      let mergeSame = true;

      while (board[below] === 0 || (mergeSame && board[i] === board[below])) {
        changed = true;

        if (board[below] !== 0) {
          // Ensure non-greedy behavior, only allow first merge after downfall.
          mergeSame = false;

          scoreIncrease += board[i] * 2;
        }

        // Merge or update tile.
        board[below] += board[i];
        board[i] = 0;
        i = below;
        below = i + boardSize;
      }
    }
  }

  // Undo board rotation.
  board = rotateBoard(board, direction, true);

  // Generate a new tile on change.
  if (changed) {
    board = newTile(board);
  }

  return { board, scoreIncrease };
}

export function movePossible(board: BoardType): boolean {
  const boardSize = Math.sqrt(board.length);

  if (containsEmpty(board)) {
    return true;
  }

  for (let i = 0; i < board.length; i++) {
    if (
      board[i] === board[i + boardSize] ||
      board[i] === board[i - boardSize] ||
      (i % boardSize !== 0 && board[i] === board[i - 1]) ||
      (i % boardSize !== boardSize - 1 && board[i] === board[i + 1])
    ) {
      return true;
    }
  }

  return false;
}
