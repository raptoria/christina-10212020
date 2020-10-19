import { Reducer } from 'react';
import { State, Action, ActionTypes } from '../store/types';

export const documents: Reducer<State['ledger'], Action> = (state, action) => {
  switch (action.type) {
    case ActionTypes.receiveDocuments:
      return { ...state, ...action.payload };
    case ActionTypes.receiveError:
      return { ...state, ...action.payload, loading: false };
    default:
      return state;
  }
};
