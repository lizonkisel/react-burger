import {baseUrl, getCookie, checkResponse} from '../../utils/utils';
import { AppDispatch, AppThunk } from '../types';

import { GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLOSE_ORDER } from '../constants/index';
import { TGetOrderResponse } from '../types/server-data';

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
  readonly isOrderRejected: false,
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

function getOrderSuccessAction(res: TGetOrderResponse): IGetOrderSuccessAction {
  return {
    type: GET_ORDER_SUCCESS,
    isOrderModalClosed: false,
    isOrderSent: false,
    isOrderRejected: false,
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


const getOrder: AppThunk = (ingredientsIdArray: Array<string>) => {
  return function(dispatch: AppDispatch) {
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
    .then(res => checkResponse<TGetOrderResponse>(res))
    .then(res => {
      dispatch(getOrderSuccessAction(res))
    })
    .catch(err => {console.log(err, err.status);
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

export { getOrder, closeOrder };
