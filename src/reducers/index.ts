import { Store } from 'redux';

import { ActionType } from '../types/ActionType';
import { ActionModel } from '../types/Models';
import {
  initializeBoard,
  BoardType,
  updateBoard,
  movePossible,
} from '../functions/board';
import { Direction } from '../types/Direction';

const boardSize = parseInt(process.env.REACT_APP_BOARD_SIZE || '4') || 4;

export interface StateType {
  boardSize: number;
  board: BoardType;
  defeat: boolean;
}

let initialState: StateType = {
  boardSize: boardSize,
  board: initializeBoard(boardSize),
  defeat: false,
};

export type StoreType = Store<StateType, ActionModel>;

function applicationState(state = initialState, action: ActionModel) {
  const newState = { ...state };

  switch (action.type) {
    case ActionType.RESET:
      newState.board = initializeBoard(newState.boardSize);
      break;
    case ActionType.MOVE:
      const direction = action.value as Direction;
      newState.board = updateBoard(newState.board, direction);
      break;
    default:
      return state;
  }

  newState.defeat = !movePossible(newState.board);

  return newState;
}

export default applicationState;
