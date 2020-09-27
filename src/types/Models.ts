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

export interface AnimationModel {
  type: 'new' | 'merge' | 'move';
  index: number;
}

export interface AnimationNew extends AnimationModel {
  type: 'new';
  index: number;
}

export interface AnimationMerge extends AnimationModel {
  type: 'merge';
  index: number;
}

export interface AnimationMove extends AnimationModel {
  type: 'move';
  index: number;
  direction: Direction;
  value: number;
}

export type Animation = AnimationNew | AnimationMerge | AnimationMove;
