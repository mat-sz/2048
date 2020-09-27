import { Direction } from '../types/Direction';
import { Animation, Point } from '../types/Models';

export type BoardType = number[];

export function newTileValue() {
  return Math.random() > 0.1 ? 2 : 4;
}

function containsEmpty(board: BoardType): boolean {
  return board.find(value => value === 0) === 0;
}

interface NewTileResult {
  board: BoardType;
  index?: number;
}

function newTile(board: BoardType): NewTileResult {
  if (!containsEmpty(board)) {
    return { board };
  }

  let index: number | undefined = undefined;

  while (true) {
    index = Math.floor(Math.random() * board.length);
    if (board[index] === 0) {
      board[index] = newTileValue();
      break;
    }
  }

  return {
    board,
    index,
  };
}

export interface BoardUpdate {
  board: BoardType;
  animations?: Animation[];
  scoreIncrease: number;
}

export function initializeBoard(boardSize: number): BoardUpdate {
  const board = new Array(boardSize ** 2).fill(0);
  const animations: Animation[] = [];

  // Spawn two tiles at first.
  let result = newTile(board);
  if (result.index) {
    animations.push({
      type: 'new',
      index: result.index,
    });
  }

  result = newTile(board);
  if (result.index) {
    animations.push({
      type: 'new',
      index: result.index,
    });
  }

  return { board, scoreIncrease: 0 };
}

function getRotatedIndex(
  index: number,
  boardSize: number,
  direction: Direction
): number {
  let x = index % boardSize;
  let y = Math.floor(index / boardSize);

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

  return y * boardSize + x;
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
    const index = getRotatedIndex(i, boardSize, direction);
    newBoard[index] = board[i];
  }

  return newBoard;
}

function rotateAnimations(
  board: BoardType,
  animations: Animation[],
  direction: Direction
): Animation[] {
  // No need to rotate, it's already in the correct orientation.
  if (direction === Direction.DOWN) {
    return animations;
  }

  const boardSize = Math.sqrt(board.length);

  switch (direction) {
    case Direction.LEFT:
      direction = Direction.RIGHT;
      break;
    case Direction.RIGHT:
      direction = Direction.LEFT;
      break;
  }

  for (let animation of animations) {
    animation.index = getRotatedIndex(animation.index, boardSize, direction);
  }

  return animations;
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
  let animations: Animation[] = [];

  // Going from second last to the first row on the rotated board.
  for (let row = boardSize - 2; row >= 0; row--) {
    for (let col = 0; col < boardSize; col++) {
      const initialIndex = row * boardSize + col;
      let i = initialIndex;
      let below = i + boardSize;
      let mergeSame = true;
      let finalIndex: number | undefined = undefined;

      while (board[below] === 0 || (mergeSame && board[i] === board[below])) {
        changed = true;

        if (board[below] !== 0) {
          // Ensure non-greedy behavior, only allow first merge after fall.
          mergeSame = false;

          scoreIncrease += board[i] * 2;
        }

        // Merge or update tile.
        board[below] += board[i];
        board[i] = 0;
        i = below;
        finalIndex = below;
        below = i + boardSize;
      }

      if (finalIndex !== undefined) {
        animations.push({
          type: 'move',
          index: initialIndex,
          direction,
          value: Math.floor((finalIndex - initialIndex) / boardSize),
        });
      }
    }
  }

  // Undo board rotation.
  board = rotateBoard(board, direction, true);
  animations = rotateAnimations(board, animations, direction);

  // Generate a new tile on change.
  if (changed) {
    const result = newTile(board);
    board = result.board;

    if (result.index) {
      animations.push({
        type: 'new',
        index: result.index,
      });
    }
  }
  console.log(animations);

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
