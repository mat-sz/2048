import { BoardType } from '../functions/board';
import { ActionType } from './ActionType';
import { Direction } from './Direction';

export interface ActionModel {
  type: ActionType;
  value?: any;
}

export interface StorageModel {
  best?: number;
  score?: number;
  board?: BoardType;
  boardSize?: number;
  defeat?: boolean;
}

export interface Point {
  x: number;
  y: number;
}
