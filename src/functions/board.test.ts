import { Direction } from '../types/Direction';
import { initializeBoard, newTileValue, updateBoard } from './board';

describe('board', () => {
  it('new tile value returns either 2 or 4', () => {
    expect([2, 4]).toContain(newTileValue());
  });

  it('initializes board with two non-zero tiles', () => {
    const boardSize = 4;
    const board = initializeBoard(boardSize);
    expect(board.length).toBe(boardSize ** 2);
    expect(board.filter(value => value === 0).length).toBe(boardSize ** 2 - 2);
  });

  it('moves tiles down', () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0];
    const update = updateBoard(board, Direction.DOWN);
    expect(update.board[15]).toBe(4);
    expect(update.scoreIncrease).toBe(0);

    // Make sure a new tile is generated.
    expect(update.board.filter(value => value !== 0).length).toBe(2);
  });

  it('moves tiles up', () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0];
    const update = updateBoard(board, Direction.UP);
    expect(update.board[3]).toBe(4);
    expect(update.scoreIncrease).toBe(0);

    // Make sure a new tile is generated.
    expect(update.board.filter(value => value !== 0).length).toBe(2);
  });

  it('moves tiles left', () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0];
    const update = updateBoard(board, Direction.LEFT);
    expect(update.board[4]).toBe(4);
    expect(update.scoreIncrease).toBe(0);

    // Make sure a new tile is generated.
    expect(update.board.filter(value => value !== 0).length).toBe(2);
  });

  it('moves tiles right', () => {
    const board = [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const update = updateBoard(board, Direction.RIGHT);
    expect(update.board[7]).toBe(4);
    expect(update.scoreIncrease).toBe(0);

    // Make sure a new tile is generated.
    expect(update.board.filter(value => value !== 0).length).toBe(2);
  });
});
