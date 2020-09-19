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
import { getStoredData, setStoredData } from '../functions/localStorage';

const boardSize = parseInt(process.env.REACT_APP_BOARD_SIZE || '4') || 4;

export interface StateType {
  boardSize: number;
  board: BoardType;
  defeat: boolean;
  score: number;
  best: number;
}

const storedData = getStoredData();

let initialState: StateType = {
  boardSize: storedData.boardSize || boardSize,
  board: storedData.board || initializeBoard(boardSize),
  defeat: storedData.defeat || false,
  score: storedData.score || 0,
  best: storedData.best || 0,
};

export type StoreType = Store<StateType, ActionModel>;

function applicationState(state = initialState, action: ActionModel) {
  const newState = { ...state };

  switch (action.type) {
    case ActionType.RESET:
      newState.board = initializeBoard(newState.boardSize);
      newState.score = 0;
      break;
    case ActionType.MOVE:
      const direction = action.value as Direction;
      const update = updateBoard(newState.board, direction);
      newState.board = update.board;
      newState.score += update.scoreIncrease;
      break;
    default:
      return state;
  }

  if (newState.score > newState.best) {
    newState.best = newState.score;
  }

  newState.defeat = !movePossible(newState.board);
  setStoredData(newState);

  return newState;
}

export default applicationState;
