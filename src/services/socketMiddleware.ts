import { IWsActions } from './constants/wsActionTypes';
import { Middleware, MiddlewareAPI } from 'redux';
import { RootState } from './types';
import { AppDispatch } from './types';

export const socketMiddleware = (wsUrl: string, wsActions: IWsActions): Middleware<{}, RootState> => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => action => {

      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsInitWithToken, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}`);
      };

      if (type === wsInitWithToken) {
        socket = new WebSocket(payload);
      };

      if (type === onClose && socket !== null) {
        socket.close();
      };

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
