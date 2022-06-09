const GET_ORDER = 'GET_ORDER';
const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
const CLOSE_ORDER = "CLOSE_ORDER";

function getOrder(ingredientsIdArray) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER
    });

    fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "ingredients": ingredientsIdArray
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status)
      }
    })
    .then(res => {
      dispatch({
        type: GET_ORDER_SUCCESS,
        number: res.order.number,
        isOrderAccepted: true
      })
    })
    .catch(err => console.log(`${err}: ${err.status}`))
  }
}

function closeOrder() {
  return {
    type: CLOSE_ORDER,
    isReadyForNewOrder: true
  }
}

export { GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLOSE_ORDER, getOrder, closeOrder };
