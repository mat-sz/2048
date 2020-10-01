import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { resetAction } from '../actions';

const Defeat: React.FC = () => {
  const dispatch = useDispatch();
  const reset = useCallback(() => dispatch(resetAction()), [dispatch]);

  return (
    <div className="overlay overlay-defeat">
      <h1>Game over!</h1>
      <button onClick={reset}>Try again</button>
    </div>
  );
};

export default Defeat;
