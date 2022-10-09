import {baseUrl, getCookie, checkResponse} from '../../utils/utils';
import { AppDispatch, AppThunk } from '../types';

import { GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLOSE_ORDER } from '../constants/index';

// const GET_ORDER = 'GET_ORDER';
// const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
// const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
// const CLOSE_ORDER = "CLOSE_ORDER";

interface IGetOrderAction {
  readonly type: typeof GET_ORDER,
  readonly isOrderModalClosed: true,
  readonly isOrderSent: true,
  readonly isOrderRejected: false
}

interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS,
  readonly isOrderModalClosed: false,
  readonly isOrderSent: false,
  readonly isOrderRejectedd: false,
  readonly number: number
}

interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED,
  readonly isOrderModalClosed: true,
  readonly isOrderSent: false,
  readonly isOrderRejected: true
}

function getOrderAction(): IGetOrderAction {
  return {
    type: GET_ORDER,
    isOrderModalClosed: true,
    isOrderSent: true,
    isOrderRejected: false,
  }
};

// Убрать any
function getOrderSuccessAction(res: any): IGetOrderSuccessAction {
  return {
    type: GET_ORDER_SUCCESS,
    isOrderModalClosed: false,
    isOrderSent: false,
    isOrderRejectedd: false,
    number: res.order.number
  }
};

function getOrderFailedAction(): IGetOrderFailedAction {
  return {
    type: GET_ORDER_FAILED,
    isOrderModalClosed: true,
    isOrderSent: false,
    isOrderRejected: true
  }
};


// function getOrder(ingredientsIdArray) {
const getOrder: AppThunk = (ingredientsIdArray: Array<string>) => {
  return function(dispatch: AppDispatch) {
    // dispatch({
    //   type: GET_ORDER,
    //   isOrderModalClosed: true,
    //   isOrderSent: true,
    //   isOrderRejected: false,
    // });
    dispatch(getOrderAction())

    fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({
        "ingredients": ingredientsIdArray
      })
    })
    .then(checkResponse)
    .then(res => {
      // dispatch({
      //   type: GET_ORDER_SUCCESS,
      //   isOrderModalClosed: false,
      //   isOrderSent: false,
      //   isOrderRejectedd: false,
      //   number: res.order.number
      // })
      dispatch(getOrderSuccessAction(res))
    })
    .catch(err => {console.log(err, err.status);
      // dispatch({
      //   type: GET_ORDER_FAILED,
      //   isOrderModalClosed: true,
      //   isOrderSent: false,
      //   isOrderRejected: true
      // })
      dispatch(getOrderFailedAction())
    })
  }
}

interface ICloseOrderAction {
  readonly type: typeof CLOSE_ORDER,
  readonly isOrderModalClosed: true,
  readonly number: null
}

export type TOrderActions =
  IGetOrderAction |
  IGetOrderSuccessAction |
  IGetOrderFailedAction |
  ICloseOrderAction
;

function closeOrder(): ICloseOrderAction {
  return {
    type: CLOSE_ORDER,
    isOrderModalClosed: true,
    number: null
  }
}

// export { GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLOSE_ORDER, getOrder, closeOrder };
export { getOrder, closeOrder };
