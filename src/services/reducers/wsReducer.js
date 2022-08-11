import {
  WS_CONNECTION_START,
  WS_CONNECTION_START_WITH_TOKEN,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_RESET_ERROR
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

    // case WS_CONNECTION_START:
    //   return {
    //     ...state,
    //     wsConnected: true,
    //     error: undefined
    // };

    // case WS_CONNECTION_START_WITH_TOKEN:
    //   return {
    //     ...state,
    //     wsConnected: true,
    //     error: undefined
    // };

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

      const allOrders = action.payload.orders;
      console.log(allOrders);
      const rightOrders = [];

      allOrders.forEach((order) => {
        if (!order.ingredients.includes(null)) {
          rightOrders.push(order);
        }
      });

      console.log(allOrders.length);
      console.log(rightOrders.length);

      return {
        ...state,
        orders: rightOrders,
        // orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        error: undefined
        // messages: [...state.messages, action.payload]

      };

      case WS_RESET_ERROR:
        return {
          ...state,
          wsConnected: false,
          orders: null,
          total: null,
          totalToday: null,
          error: undefined
        }

    default:
      return state;
  }
}

