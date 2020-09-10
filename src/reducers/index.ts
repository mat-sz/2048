import { Store } from 'redux';
import { ActionModel } from '../types/Models';

export interface StateType {}

let initialState: StateType = {};

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
