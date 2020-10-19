import match from 'conditional-expression';
import { Action, ActionIdentity } from '../store/types';
import { documentMiddleware } from './documentMiddleware';
import { Dispatch } from 'react';

interface TakeEvery {
  actionName: string;
  functionCall: <T extends ActionIdentity>(action: T) => Promise<Action>;
}
const middlewares = [documentMiddleware];

export const takeEvery = (
  actionName: string,
  functionCall: <T extends ActionIdentity>(action: T) => Promise<Action>
): TakeEvery => {
  return {
    actionName,
    functionCall,
  };
};

/***
 * applyMiddleware: the function that will be executed before any dispatched event
 */
export const applyMiddleware = (dispatch: Dispatch<Action>) => (
  action: Action
) => {
  dispatch(action);
  middlewares.forEach((useMiddleware) => {
    let value = null;
    const middleWare = useMiddleware();

    while (value !== undefined) {
      value = middleWare.next().value as TakeEvery;

      if (value !== undefined) {
        match(value)
          .on((take: TakeEvery) => take.actionName === action.type)
          .then((takeEveryResult: TakeEvery) =>
            takeEveryResult.functionCall(action).then((callResult) => {
              if (callResult) {
                applyMiddleware(dispatch)(callResult);
              }
            })
          );
      }
    }
  });
};
