import React, { CSSProperties, useMemo, useRef } from 'react';

import { Animation, AnimationMove, AnimationType } from '../types/Animations';
import { Direction } from '../types/Direction';

export interface BoardTileProps {
  value: number;
  animations?: Animation[];
}

const BoardTile: React.FC<BoardTileProps> = ({ value, animations }) => {
  const moveAnimation = useMemo<AnimationMove | undefined>(
    () =>
      animations?.find(
        animation => animation.type === AnimationType.MOVE
      ) as AnimationMove,
    [animations]
  );
  const innerDivRef = useRef<HTMLDivElement>(null);

  const style = useMemo(() => {
    const value: CSSProperties = {};
    let animating = false;
    let totalHeight = 100;

    if (innerDivRef.current) {
      const element = innerDivRef.current;
      totalHeight = element.clientHeight;

      // Get the grid gap if possible.
      const gridElement = element.parentElement?.parentElement;
      if (gridElement) {
        const computed = window.getComputedStyle(gridElement);
        const computedGap = parseInt(computed.gridColumnGap);
        if (computedGap) {
          totalHeight += computedGap;
        }
      }
    }

    if (moveAnimation) {
      animating = true;

      switch (moveAnimation.direction) {
        case Direction.UP:
          value.transform =
            'translateY(-' + moveAnimation.value * totalHeight + 'px)';
          break;
        case Direction.DOWN:
          value.transform =
            'translateY(' + moveAnimation.value * totalHeight + 'px)';
          break;
        case Direction.LEFT:
          value.transform =
            'translateX(-' + moveAnimation.value * totalHeight + 'px)';
          break;
        case Direction.RIGHT:
          value.transform =
            'translateX(' + moveAnimation.value * totalHeight + 'px)';
          break;
      }
    }

    if (animating) {
      value.transition = '0.1s ease-in-out all';
    }

    return value;
  }, [moveAnimation]);

  return (
    <div className="board-tile">
      {value !== 0 && (
        <div
          className={'board-tile-value board-tile-' + value}
          style={style}
          ref={innerDivRef}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default BoardTile;
