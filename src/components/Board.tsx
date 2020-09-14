import React from 'react';

export interface BoardProps {
  boardSize: number;
}

const Board: React.FC<BoardProps> = ({ boardSize }) => {
  return (
    <div className="board" style={{ '--board-size': boardSize } as any}>
      {new Array(Math.pow(boardSize, 2)).fill(undefined).map((_, i) => (
        <div className="board-tile board-tile-empty" key={i}>
          <div className="board-tile-text">2</div>
        </div>
      ))}
    </div>
  );
};

export default Board;
