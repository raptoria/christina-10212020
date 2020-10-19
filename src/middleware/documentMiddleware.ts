import {
  Action,
  ActionIdentity,
  ActionTypes,
  ApiResponse,
} from '../store/types';
import { takeEvery } from './middleware';

export async function getDocuments<T extends ActionIdentity>(
  action: T
): Promise<Action> {
  const searchString = action.payload!.searchString;

  try {
    const response: Response = await fetch(
      `/api/documents?searchString=${searchString}`
    );
    const result: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }
    debugger;
    return {
      type: ActionTypes.receiveDocuments,
      payload: result,
    };
  } catch (error) {
    return {
      type: ActionTypes.receiveError,
      payload: { error: error.message },
    };
  }
}

export async function uploadDocument<T extends ActionIdentity>(
  action: T
): Promise<Action> {
  try {
    const response: Response = await fetch(
      'https://localhost:8080/api/documents/',
      {
        method: 'POST',
        body: JSON.stringify(action.payload),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return {
      type: ActionTypes.getDocuments,
      payload: { searchString: null },
    };
  } catch (error) {
    return {
      type: ActionTypes.receiveError,
      payload: { error: error.message },
    };
  }
}

export function* documentMiddleware() {
  yield takeEvery(ActionTypes.getDocuments, getDocuments);
  yield takeEvery(ActionTypes.uploadDocument, uploadDocument);
}
