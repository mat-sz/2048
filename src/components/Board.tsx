import React from 'react';

export interface BoardProps {
  boardSize: number;
}

const Board: React.FC<BoardProps> = ({ boardSize }) => {
  return (
    <div className="board" style={{ '--board-size': boardSize } as any}>
      {new Array(Math.pow(boardSize, 2)).fill(undefined).map((_, i) => (
        <div className="board-box board-box-empty" key={i}>
          <div className="board-box-text">2</div>
        </div>
      ))}
    </div>
  );
};

export default Board;
