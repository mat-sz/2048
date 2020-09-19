import React from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../reducers';

const Header: React.FC = () => {
  const score = useSelector((state: StateType) => state.score);

  return (
    <div className="header">
      <h1>2048</h1>
      <div className="header-scores">
        <div className="header-scores-score">
          <div>Score</div>
          <div>{score}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
