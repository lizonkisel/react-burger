export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_START_WITH_TOKEN: 'WS_CONNECTION_START_WITH_TOKEN' = 'WS_CONNECTION_START_WITH_TOKEN';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_RESET_ERROR: 'WS_RESET_ERROR' = 'WS_RESET_ERROR';

export interface IWsActions {
  wsInit: string,
  wsInitWithToken: string,
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string,
  wsResetError: string
}

export const wsActions: IWsActions = {
  wsInit: WS_CONNECTION_START,
  wsInitWithToken: WS_CONNECTION_START_WITH_TOKEN,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsResetError: WS_RESET_ERROR
};
