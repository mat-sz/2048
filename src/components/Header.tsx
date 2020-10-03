import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetAction, undoAction } from '../actions';
import { StateType } from '../reducers';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const reset = useCallback(() => dispatch(resetAction()), [dispatch]);
  const undo = useCallback(() => dispatch(undoAction()), [dispatch]);

  const score = useSelector((state: StateType) => state.score);
  const scoreIncrease = useSelector((state: StateType) => state.scoreIncrease);
  const moveId = useSelector((state: StateType) => state.moveId);
  const best = useSelector((state: StateType) => state.best);
  const previousBoard = useSelector((state: StateType) => state.previousBoard);

  return (
    <div className="header">
      <div className="header-row">
        <h1>2048</h1>
        <div className="header-scores">
          <div className="header-scores-score">
            <div>Score</div>
            <div>{score}</div>
            {!!scoreIncrease && (
              <div className="header-scores-score-increase" key={moveId}>
                +{scoreIncrease}
              </div>
            )}
          </div>
          <div className="header-scores-score">
            <div>Best</div>
            <div>{best}</div>
          </div>
        </div>
      </div>
      <div className="header-row">
        <div>
          Join the numbers and get to the <strong>2048 tile!</strong>
        </div>
        <div className="header-buttons">
          <button onClick={undo} disabled={!previousBoard}>
            Undo
          </button>
          <button onClick={reset}>New game</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
