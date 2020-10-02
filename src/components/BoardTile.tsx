import React, { CSSProperties, useMemo } from 'react';
import clsx from 'clsx';

import { Animation, AnimationMove, AnimationType } from '../types/Animations';
import { Direction } from '../types/Direction';
import { animationDuration, gridGap } from '../config';

export interface BoardTileProps {
  value: number;
  animations?: Animation[];
}

function tileTranslate(axis: 'X' | 'Y', value: number) {
  return `translate${axis}(calc(${value} * (${gridGap} + 100%))`;
}

const BoardTile: React.FC<BoardTileProps> = ({ value, animations }) => {
  const moveAnimation = useMemo<AnimationMove | undefined>(
    () =>
      animations?.find(
        animation => animation.type === AnimationType.MOVE
      ) as AnimationMove,
    [animations]
  );
  const newAnimation = useMemo<AnimationMove | undefined>(
    () =>
      animations?.find(
        animation => animation.type === AnimationType.NEW
      ) as AnimationMove,
    [animations]
  );
  const mergeAnimation = useMemo<AnimationMove | undefined>(
    () =>
      animations?.find(
        animation => animation.type === AnimationType.MERGE
      ) as AnimationMove,
    [animations]
  );

  const style = useMemo(() => {
    if (!moveAnimation) {
      return {};
    }

    const value: CSSProperties = {
      transition: animationDuration + 'ms ease-in-out all',
    };

    switch (moveAnimation.direction) {
      case Direction.UP:
        value.transform = tileTranslate('Y', -1 * moveAnimation.value);
        break;
      case Direction.DOWN:
        value.transform = tileTranslate('Y', moveAnimation.value);
        break;
      case Direction.LEFT:
        value.transform = tileTranslate('X', -1 * moveAnimation.value);
        break;
      case Direction.RIGHT:
        value.transform = tileTranslate('X', moveAnimation.value);
        break;
    }

    return value;
  }, [moveAnimation]);

  return (
    <div className="board-tile">
      {value !== 0 && (
        <div
          className={clsx('board-tile-value', 'board-tile-' + value, {
            'board-tile-new': !!newAnimation,
            'board-tile-merge': !!mergeAnimation,
          })}
          style={style}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default BoardTile;
