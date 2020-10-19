import { Reducer } from 'react';
import { State, Action, ActionTypes } from '../store/types';

export const documents: Reducer<State['documents'], Action> = (
  state,
  action
) => {
  switch (action.type) {
    case ActionTypes.receiveDocuments:
      debugger;
      return { ...state, ...action.payload };
    case ActionTypes.receiveError:
      return { ...state, ...action.payload, loading: false };
    default:
      return state;
  }
};
