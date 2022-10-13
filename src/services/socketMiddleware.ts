import { wsConnectionSuccessAction, wsGetMessageAction, wsErrorAction, wsCloseAction } from './actions/wsActions';
import { IWsActions } from './constants/wsActionTypes';
import { Middleware } from 'redux';
import { RootState } from './types';
import { AppDispatch } from './types';

export const socketMiddleware = (wsUrl: string, wsActions: IWsActions): Middleware<{}, RootState, AppDispatch> => {
  return store => {
    let socket: WebSocket | null = null;

    return next => action => {
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

      if (type === onClose) {
        socket.close();
      };

      if (socket) {
        socket.onopen = event => {
          // dispatch({ type: onOpen, payload: event });
          dispatch(wsConnectionSuccessAction(event))
        };

        socket.onerror = event => {
          console.log(event);
          console.log(`Ошибка ${event.message}`)
          // dispatch({ type: onError, payload: event });
          dispatch(wsErrorAction(event));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          console.log(parsedData);

          // dispatch({ type: onMessage, payload: restParsedData });
          dispatch(wsGetMessageAction(restParsedData));
        };

        socket.onclose = event => {
          // dispatch({ type: onClose, payload: event });
          dispatch(wsCloseAction())
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
