import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { StateType } from '../reducers';
import { Direction } from '../types/Direction';
import { Point } from '../types/Models';
import { BoardType } from '../functions/board';
import { Animation, AnimationType } from '../types/Animations';
import BoardTile from './BoardTile';

export interface BoardProps {
  onMove?: (direction: Direction) => void;
}

const Board: React.FC<BoardProps> = ({ onMove }) => {
  const board = useSelector((state: StateType) => state.board);
  const boardSize = useSelector((state: StateType) => state.boardSize);
  const animations = useSelector((state: StateType) => state.animations);
  const startPointerLocation = useRef<Point>();
  const currentPointerLocation = useRef<Point>();

  const [renderedBoard, setRenderedBoard] = useState(board);
  const [renderedAnimations, setRenderedAnimations] = useState<Animation[]>([]);
  const lastBoard = useRef<BoardType>([...board]);
  const animationTimeout = useRef<any>();

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

  useEffect(() => {
    if (!animations) {
      setRenderedBoard([...board]);
      return;
    }

    setRenderedBoard(lastBoard.current);
    setRenderedAnimations(
      animations.filter(animation => animation.type === AnimationType.MOVE)
    );

    clearTimeout(animationTimeout.current);
    animationTimeout.current = setTimeout(() => {
      setRenderedAnimations(
        animations.filter(animation => animation.type !== AnimationType.MOVE)
      );
      setRenderedBoard([...board]);
    }, 100);

    lastBoard.current = [...board];
  }, [animations, board, setRenderedBoard, setRenderedAnimations]);

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
      {renderedBoard.map((value, i) => (
        <BoardTile
          value={value}
          key={i}
          animations={renderedAnimations?.filter(
            animation => animation.index === i
          )}
        />
      ))}
    </div>
  );
};

export default Board;
