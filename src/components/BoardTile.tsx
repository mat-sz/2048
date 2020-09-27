import React from 'react';

export interface BoardTileProps {
  value: number;
}

const BoardTile: React.FC<BoardTileProps> = ({ value }) => {
  return (
    <div
      className={
        'board-tile ' +
        (value === 0
          ? 'board-tile-empty'
          : 'board-tile-not-empty board-tile-' + value)
      }
    >
      {value !== 0 && <div className="board-tile-text">{value}</div>}
    </div>
  );
};

export default BoardTile;
