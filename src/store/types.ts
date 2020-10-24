import {
  uploadDocument,
  getDocuments,
  deleteDocument,
  receiveDocuments,
  receiveError,
} from '../actions/actions';

export interface ApiResponse {
  error?: string;
  message?: string;
}

export interface Document {
  name: string;
  size: number;
  mimeType: string;
}

export enum sizeUnit {
  kb = 'kb',
  mb = 'mb',
}

export interface Documents {
  documentList?: Document[] | null;
  searchString?: String | null;
  documentName?: String | null;
  error?: String | null;
  loading?: Boolean;
}

export interface State {
  documents: Documents;
  [index: string]: Documents;
}

export const enum ActionTypes {
  uploadDocument = 'UPLOAD_DOCUMENTS',
  getDocuments = 'GET_DOCUMENTS',
  receiveDocuments = 'RECEIVE_DOCUMENTS',
  receiveError = 'RECEIVE_ERROR',
  deleteDocument = 'DELETE_DOCUMENT',
}

export interface ActionIdentity {
  type: string;
  payload?: Partial<Documents & Document>;
}

export type Action =
  | { type: ActionTypes.uploadDocument; payload: Document }
  | {
      type: ActionTypes.getDocuments;
      payload?: State['documents'];
    }
  | {
      type: ActionTypes.receiveDocuments;
      payload: State['documents'];
    }
  | {
      type: ActionTypes.receiveError;
      payload: State['documents'];
    }
  | {
      type: ActionTypes.deleteDocument;
      payload: State['documents'];
    };

export interface Actions {
  uploadDocument: (...p: Parameters<typeof uploadDocument>) => void;
  getDocuments: (...p: Parameters<typeof getDocuments>) => void;
  receiveDocuments: (...p: Parameters<typeof receiveDocuments>) => void;
  receiveError: (...p: Parameters<typeof receiveError>) => void;
  deleteDocument: (...p: Parameters<typeof deleteDocument>) => void;
}

export interface StoreContext {
  state: State;
  actions: Actions;
}

export interface StoreContextType {
  state: State;
  actions: Actions;
}
