import {GET_ORDER, GET_ORDER_SUCCESS, CLOSE_ORDER} from '../actions/order.js';

const orderInitialState = {
  isOrderAccepted: false,
  number: null,
  isReadyForNewOrder: true
};

const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case GET_ORDER: {
      return state
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        number: action.number,
        isOrderAccepted: action.isOrderAccepted,
        isReadyForNewOrder: false
      }
    }
    case CLOSE_ORDER: {
      return {
        ...state,
        isReadyForNewOrder: true
      }
    }
    default:
      return state
  }
};

export {orderReducer};
