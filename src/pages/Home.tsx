import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../components/Header';
import Board from '../components/Board';
import { moveAction } from '../actions';
import { Direction } from '../types/Direction';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const onMove = useCallback(
    (direction: Direction) => dispatch(moveAction(direction)),
    [dispatch]
  );

  useEffect(() => {
    const keydownListener = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          onMove(Direction.DOWN);
          break;
        case 'ArrowUp':
          onMove(Direction.UP);
          break;
        case 'ArrowLeft':
          onMove(Direction.LEFT);
          break;
        case 'ArrowRight':
          onMove(Direction.RIGHT);
          break;
      }
    };

    window.addEventListener('keydown', keydownListener);

    return () => {
      window.removeEventListener('keydown', keydownListener);
    };
  }, [onMove]);

  return (
    <div className="page">
      <Header />
      <Board onMove={onMove} />
    </div>
  );
};

export default Home;
