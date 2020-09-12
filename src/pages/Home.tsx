import React from 'react';
import Board from '../components/Board';

const boardSize = parseInt(process.env.REACT_APP_BOARD_SIZE || '4') || 4;

const Home: React.FC = () => {
  return (
    <div className="page">
      <h1>2048</h1>
      <Board boardSize={boardSize} />
    </div>
  );
};

export default Home;
