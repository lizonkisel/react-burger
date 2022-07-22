export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsInitWithToken, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}`);
      };

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
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          console.log(parsedData);

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
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
