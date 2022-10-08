import {
  WS_CONNECTION_START,
  WS_CONNECTION_START_WITH_TOKEN,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_RESET_ERROR
} from '../constants/wsActionTypes.ts';

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsInitWithToken: WS_CONNECTION_START_WITH_TOKEN,
  // wsInitWithToken: ((url) => {
  //   return {
  //     type: WS_CONNECTION_START_WITH_TOKEN,
  //     payload: url,
  //   }})(),
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsResetError: WS_RESET_ERROR
};

export const wsInitWithToken = (url) => {
  return {
    type: WS_CONNECTION_START_WITH_TOKEN,
    payload: url,
  };
}
