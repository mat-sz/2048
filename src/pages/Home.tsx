import React from 'react';

import Header from '../components/Header';
import Board from '../components/Board';
import Info from '../components/Info';
import BoardSizePicker from '../components/BoardSizePicker';

const Home: React.FC = () => {
  return (
    <div className="page">
      <Header />
      <Board />
      <BoardSizePicker />
      <Info />
    </div>
  );
};

export default Home;
