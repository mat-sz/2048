import React from 'react';

const boardSize = parseInt(process.env.REACT_APP_BOARD_SIZE || '4') || 4;

const Board: React.FC = () => {
  return (
    <div className="board" style={{ '--board-size': boardSize } as any}>
      {new Array(Math.pow(boardSize, 2)).fill(undefined).map((_, i) => (
        <div className="board-box board-box-empty" key={i}></div>
      ))}
    </div>
  );
};

export default Board;
