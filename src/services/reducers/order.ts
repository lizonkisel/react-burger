// import {GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLOSE_ORDER} from '../actions/order.js';
import {GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLOSE_ORDER} from '../constants/index';
import { TOrderActions } from '../actions/order';

type TOrderState = {
  isOrderModalClosed: boolean,
  isOrderSent: boolean,
  isOrderRejected: boolean,
  number: number | null
};

const orderInitialState: TOrderState = {
  isOrderModalClosed: true,
  isOrderSent: false,
  isOrderRejected: false,
  number: null
};

const orderReducer = (state = orderInitialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        isOrderModalClosed: action.isOrderModalClosed,
        isOrderSent: action.isOrderSent,
        isOrderRejected: action.isOrderRejected,
      }

    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        isOrderModalClosed: action.isOrderModalClosed,
        isOrderSent: action.isOrderSent,
        isOrderRejected: action.isOrderRejected,
        number: action.number
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        isOrderModalClosed: action.isOrderModalClosed,
        isOrderSent: action.isOrderSent,
        isOrderRejected: action.isOrderRejected
      }
    }
    case CLOSE_ORDER: {
      return {
        ...state,
        isOrderModalClosed: action.isOrderModalClosed,
        number: action.number
      }
    }
    default:
      return state
  }
};

export {orderReducer};
