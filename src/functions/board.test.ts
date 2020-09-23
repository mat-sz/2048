import { initializeBoard, newTileValue } from './board';

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
});
