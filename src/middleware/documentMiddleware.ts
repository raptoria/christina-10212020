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
  const str = action.payload?.searchString;
  const api = str ? `/api/documents?searchString=${str}` : '/api/documents';

  try {
    const response: Response = await fetch(api);
    const result: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

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
    const response: Response = await fetch('/api/documents/', {
      method: 'POST',
      body: JSON.stringify(action.payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return {
      type: ActionTypes.getDocuments,
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
