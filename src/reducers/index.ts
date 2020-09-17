import { Store } from 'redux';

import { ActionModel } from '../types/Models';
import { initializeBoard, BoardType } from '../functions/board';

const boardSize = parseInt(process.env.REACT_APP_BOARD_SIZE || '4') || 4;

export interface StateType {
  boardSize: number;
  board: BoardType;
}

let initialState: StateType = {
  boardSize: boardSize,
  board: initializeBoard(boardSize),
};

export type StoreType = Store<StateType, ActionModel>;

function applicationState(state = initialState, action: ActionModel) {
  const newState = { ...state };

  switch (action.type) {
    default:
      return state;
  }

  return newState;
}

export default applicationState;
