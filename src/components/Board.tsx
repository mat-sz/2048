import React from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../reducers';

const Board: React.FC = () => {
  const board = useSelector((state: StateType) => state.board);
  const boardSize = useSelector((state: StateType) => state.boardSize);

  return (
    <div className="board" style={{ '--board-size': boardSize } as any}>
      {board.map((value, i) => (
        <div
          className={
            'board-tile ' +
            (value === 0
              ? 'board-tile-empty'
              : 'board-tile-not-empty board-tile-' + value)
          }
          key={i}
        >
          <div className="board-tile-text">{value !== 0 && value}</div>
        </div>
      ))}
    </div>
  );
};

export default Board;
