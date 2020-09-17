import React from 'react';
import Board from '../components/Board';

const Home: React.FC = () => {
  return (
    <div className="page">
      <h1>2048</h1>
      <Board />
    </div>
  );
};

export default Home;
