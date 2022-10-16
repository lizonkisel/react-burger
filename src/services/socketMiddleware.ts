// import { wsConnectionSuccessAction, wsGetMessageAction, wsErrorAction, wsCloseAction } from './actions/wsActions';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from './constants/wsActionTypes';
import { IWsActions } from './constants/wsActionTypes';
import { TWsActions } from './actions/wsActions';
// import { wsActions } from './constants/wsActionTypes';
import { Middleware, MiddlewareAPI } from 'redux';
import { RootState } from './types';
import { AppDispatch } from './types';

// interface IWsAction {
//   type: TWsActions
//   payload?: unknown
// }

function isWsAction(action: {type: string; payload?: unknown} ): action is TWsActions {
  return action.hasOwnProperty('type') === true
};

export const socketMiddleware = (wsUrl: string, wsActions: IWsActions): Middleware<{}, RootState> => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => action => {
      if (!isWsAction(action) && action.type !== WS_CONNECTION_START && action.type !== WS_CONNECTION_CLOSED) {
        return
      };

      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsInitWithToken, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}`);
      };

      console.log(action);
      console.log(payload);

      if (type === wsInitWithToken) {
        socket = new WebSocket(payload);
      };

      console.log(socket);

      // if (type === onClose) {
      if (type === onClose && socket !== null) {
        socket.close();
      };

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
          // dispatch(wsConnectionSuccessAction(event))
        };

        socket.onerror = event => {
          console.log(event);
          // console.log(`Ошибка ${event.message}`)
          dispatch({ type: onError, payload: event });
          // dispatch(wsErrorAction(event));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          console.log(parsedData);

          dispatch({ type: onMessage, payload: restParsedData });
          // dispatch(wsGetMessageAction(restParsedData));
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
          // dispatch(wsCloseAction())
        };

        console.log(socket);

        // if (type === wsSendMessage) {
        //   // Ваш код здесь
        //   const message = {...payload, token: user.token};
        //   socket.send(JSON.stringify(message))
        // }
      }

      next(action);
    };
  };
};
