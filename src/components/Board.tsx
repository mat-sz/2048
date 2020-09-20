import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../reducers';
import { Direction } from '../types/Direction';

interface Point {
  x: number;
  y: number;
}

export interface BoardProps {
  onMove?: (direction: Direction) => void;
}

const Board: React.FC<BoardProps> = ({ onMove }) => {
  const board = useSelector((state: StateType) => state.board);
  const boardSize = useSelector((state: StateType) => state.boardSize);
  const startPointerLocation = useRef<Point>();
  const currentPointerLocation = useRef<Point>();

  const finishPointer = useCallback(
    (a: Point, b: Point) => {
      if (!onMove) {
        return;
      }

      const distance = Math.sqrt((b.y - a.y) ** 2 + (b.x - a.x) ** 2);
      if (distance < 20) {
        return;
      }

      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      if (angle < -135 || angle > 135) {
        onMove(Direction.LEFT);
      } else if (angle < -45) {
        onMove(Direction.UP);
      } else if (angle < 45) {
        onMove(Direction.RIGHT);
      } else if (angle < 135) {
        onMove(Direction.DOWN);
      }
    },
    [onMove]
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) {
      const point: Point = { x: touch.pageX, y: touch.pageY };
      startPointerLocation.current = point;
    }
  }, []);
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) {
      const point: Point = { x: touch.pageX, y: touch.pageY };
      currentPointerLocation.current = point;
    }
  }, []);
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (startPointerLocation.current && currentPointerLocation.current) {
        finishPointer(
          startPointerLocation.current,
          currentPointerLocation.current
        );
      }

      startPointerLocation.current = undefined;
      currentPointerLocation.current = undefined;
    },
    [finishPointer]
  );

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const point: Point = { x: e.pageX, y: e.pageY };
    startPointerLocation.current = point;
  }, []);
  const onMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (startPointerLocation.current) {
        finishPointer(startPointerLocation.current, { x: e.pageX, y: e.pageY });
        startPointerLocation.current = undefined;
      }
    },
    [finishPointer]
  );

  return (
    <div
      className="board"
      style={{ '--board-size': boardSize } as any}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
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
