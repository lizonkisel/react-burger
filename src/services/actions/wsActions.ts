import {
  WS_CONNECTION_START,
  WS_CONNECTION_START_WITH_TOKEN,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_RESET_ERROR
} from '../constants/wsActionTypes';
import { TOrder, TWsMessageData } from '../types/server-data';


interface IWsInitAction {
  readonly type: typeof WS_CONNECTION_START
}

interface IWsConnectionStartWithTokenAction {
  readonly type: typeof WS_CONNECTION_START_WITH_TOKEN,
  payload: string
}

interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS,
  payload: any
}

interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE,
  payload: TWsMessageData
}

interface IWsErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR,
  payload: any
}

// interface IWsResetErrorAction {
//   readonly type: typeof WS_RESET_ERROR,

// }

interface IWsCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSED
}

export type TWsActions =
  IWsInitAction |
  IWsConnectionStartWithTokenAction |
  IWsConnectionSuccessAction |
  IWsGetMessageAction |
  IWsErrorAction |
  IWsCloseAction
;

export function wsInitAction(): IWsInitAction {
  return {
    type: WS_CONNECTION_START
  }
};

export function wsInitWithTokenAction (url: string): IWsConnectionStartWithTokenAction {
  return {
    type: WS_CONNECTION_START_WITH_TOKEN,
    payload: url,
  };
}

export function wsConnectionSuccessAction(event: any): IWsConnectionSuccessAction {
  console.log(event);
  return {
    type: WS_CONNECTION_SUCCESS, payload: event
  }
};

export function wsGetMessageAction(data: TWsMessageData): IWsGetMessageAction {
  return {
    type: WS_GET_MESSAGE, payload: data
  }
};

export function wsErrorAction(event: any): IWsErrorAction {
  return {
    type: WS_CONNECTION_ERROR, payload: event
  }
};

export function wsCloseAction(): IWsCloseAction {
  return {
    type: WS_CONNECTION_CLOSED
  }
};
