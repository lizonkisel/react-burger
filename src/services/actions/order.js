import {baseUrl, getCookie, checkResponse} from '../../utils/utils.js';

const GET_ORDER = 'GET_ORDER';
const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
const CLOSE_ORDER = "CLOSE_ORDER";

function getOrder(ingredientsIdArray) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER,
      isOrderModalClosed: true,
      isOrderSent: true,
      isOrderRejected: false,
    });

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
      dispatch({
        type: GET_ORDER_SUCCESS,
        isOrderModalClosed: false,
        isOrderSent: false,
        isOrderRejectedd: false,
        number: res.order.number
      })
    })
    .catch(err => {console.log(err, err.status);
      dispatch({
        type: GET_ORDER_FAILED,
        isOrderModalClosed: true,
        isOrderSent: false,
        isOrderRejected: true
      })
    })
  }
}

function closeOrder() {
  return {
    type: CLOSE_ORDER,
    isOrderModalClosed: true,
    number: null
  }
}

export { GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLOSE_ORDER, getOrder, closeOrder };
