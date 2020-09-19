import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetAction } from '../actions';
import { StateType } from '../reducers';

const Header: React.FC = () => {
  const score = useSelector((state: StateType) => state.score);
  const dispatch = useDispatch();
  const reset = useCallback(() => dispatch(resetAction()), [dispatch]);

  return (
    <div className="header">
      <div className="header-row">
        <h1>2048</h1>
        <div className="header-scores">
          <div className="header-scores-score">
            <div>Score</div>
            <div>{score}</div>
          </div>
        </div>
      </div>
      <div className="header-row">
        <div>
          Join the numbers and get to the <strong>2048 tile!</strong>
        </div>
        <div>
          <button onClick={reset}>New game</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
