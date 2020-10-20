import { ActionTypes, Action, State, Document } from '../store/types';
import { Dispatch } from 'react';

export const uploadDocument = (payload: Document): Action => {
  return {
    type: ActionTypes.uploadDocument,
    payload,
  };
};

export const getDocuments = (payload?: State['documents']): Action => {
  return {
    type: ActionTypes.getDocuments,
    payload,
  };
};

export const receiveDocuments = (payload: State['documents']): Action => {
  return {
    type: ActionTypes.receiveDocuments,
    payload,
  };
};

export const receiveError = (payload: State['documents']): Action => {
  return {
    type: ActionTypes.receiveError,
    payload,
  };
};

export const deleteDocument = (payload: State['documents']): Action => {
  return {
    type: ActionTypes.deleteDocument,
    payload,
  };
};

//synonymous with bindActionCreators in mapDispatchToProps, 2nd arg of connect
export const useActions = (dispatch: Dispatch<Action>) => ({
  uploadDocument: (payload: Document): void =>
    dispatch(uploadDocument(payload)),
  getDocuments: (payload?: State['documents']): void =>
    dispatch(getDocuments(payload)),
  receiveDocuments: (payload: State['documents']): void =>
    dispatch(receiveDocuments(payload)),
  receiveError: (payload: State['documents']): void =>
    dispatch(receiveError(payload)),
  deleteDocument: (payload: State['documents']): void =>
    dispatch(deleteDocument(payload)),
});
