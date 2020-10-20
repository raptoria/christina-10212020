import { Reducer } from 'react';
import { State, Action, ActionTypes } from '../store/types';

export const documents: Reducer<State['documents'], Action> = (
  state,
  action
) => {
  switch (action.type) {
    case ActionTypes.getDocuments:
      return { ...state, loading: true };
    case ActionTypes.uploadDocument:
      return { ...state, loading: true };
    case ActionTypes.receiveDocuments:
      return { ...state, ...action.payload, loading: false };
    case ActionTypes.receiveError:
      console.log(action.payload);
      return { ...state, ...action.payload, loading: false };
    default:
      return state;
  }
};
