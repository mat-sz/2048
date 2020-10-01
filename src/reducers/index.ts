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
import { Animation } from '../types/Animations';

const boardSize = parseInt(process.env.REACT_APP_BOARD_SIZE || '4') || 4;

export interface StateType {
  /** Board size. Currently always 4. */
  boardSize: number;

  /** Current board. */
  board: BoardType;

  /** Previous board. */
  previousBoard?: BoardType;

  /** Show victory screen. */
  victory: boolean;

  /** Is game over? */
  defeat: boolean;

  /** Current score. */
  score: number;

  /** Score increase after last update. */
  scoreIncrease?: number;

  /** Best score. */
  best: number;

  /** Used for certain animations. Mainly as a value of the "key" property. */
  moveId?: string;

  /** Animations after last update. */
  animations?: Animation[];
}

const storedData = getStoredData();

function initializeState(): StateType {
  const update = initializeBoard(boardSize);

  return {
    boardSize: storedData.boardSize || boardSize,
    board: storedData.board || update.board,
    defeat: storedData.defeat || false,
    victory: false,
    score: storedData.score || 0,
    best: storedData.best || 0,
    moveId: new Date().getTime().toString(),
  };
}

let initialState: StateType = initializeState();

export type StoreType = Store<StateType, ActionModel>;

function applicationState(state = initialState, action: ActionModel) {
  const newState = { ...state };

  switch (action.type) {
    case ActionType.RESET:
      {
        const update = initializeBoard(newState.boardSize);
        newState.board = update.board;
        newState.score = 0;
        newState.animations = update.animations;
        newState.previousBoard = undefined;
        newState.victory = false;
      }
      break;
    case ActionType.MOVE:
      {
        const direction = action.value as Direction;
        const update = updateBoard(newState.board, direction);
        newState.previousBoard = [...newState.board];
        newState.board = update.board;
        newState.score += update.scoreIncrease;
        newState.animations = update.animations;
        newState.scoreIncrease = update.scoreIncrease;
        newState.moveId = new Date().getTime().toString();
      }
      break;
    case ActionType.UNDO:
      if (!newState.previousBoard) {
        break;
      }

      newState.board = newState.previousBoard;
      newState.previousBoard = undefined;

      if (newState.scoreIncrease) {
        newState.score -= newState.scoreIncrease;
      }
      break;
    default:
      return state;
  }

  if (newState.score > newState.best) {
    newState.best = newState.score;
  }

  newState.defeat = !movePossible(newState.board);
  newState.victory = !!newState.board.find(value => value === 2048);
  setStoredData(newState);

  return newState;
}

export default applicationState;
