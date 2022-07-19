import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../actions/wsActionTypes.js';


const initialState = {
  wsConnected: false,
  // messages: [],
  orders: null,
  total: null,
  totalToday: null,
  error: undefined
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: undefined
      };

    case  WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload
      };

    case  WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: undefined
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        error: undefined
        // messages: [...state.messages, action.payload]

      };
    default:
      return state;
  }
}

