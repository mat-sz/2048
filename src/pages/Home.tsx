import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../components/Header';
import Board from '../components/Board';
import { moveAction } from '../actions';
import { Direction } from '../types/Direction';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const keydownListener = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          dispatch(moveAction(Direction.DOWN));
          break;
        case 'ArrowUp':
          dispatch(moveAction(Direction.UP));
          break;
        case 'ArrowLeft':
          dispatch(moveAction(Direction.LEFT));
          break;
        case 'ArrowRight':
          dispatch(moveAction(Direction.RIGHT));
          break;
      }
    };

    window.addEventListener('keydown', keydownListener);

    return () => {
      window.removeEventListener('keydown', keydownListener);
    };
  }, [dispatch]);

  return (
    <div className="page">
      <Header />
      <Board />
    </div>
  );
};

export default Home;
