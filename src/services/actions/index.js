import {dataUrl} from '../../utils/data.js';

const GET_ALL_INGREDIENTS = 'GET_ALL_INGREDIENTS';
const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
const GET_ALL_INGREDIENTS_FAILED = 'GET_ALL_INGREDIENTS_FAILED';

const GET_CURRENT_INGREDIENT = 'GET_CURRENT_INGREDIENTS';
function getCurrentIngredient(item) {
  return {
    type: GET_CURRENT_INGREDIENT,
    item
  }
};
const GET_CURRENT_INGREDIENT_SUCCESS = 'GET_CURRENT_INGREDIENTS_SUCCESS';
const GET_CURRENT_INGREDIENT_FAILED = 'GET_CURRENT_INGREDIENTS_FAILED';

const GET_ORDER = 'GET_ORDER';
const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
const CLOSE_ORDER = "CLOSE_ORDER";

function closeOrder() {
  return {
    type: CLOSE_ORDER,
    isReadyForNewOrder: true
  }
}

const ADD_TO_CONSTRUCTOR = 'ADD_TO_CONSTRUCTOR';
const DELETE_FROM_CONSTRUCTOR = 'DELETE_FROM_CONSTRUCTOR';

const CHANGE_COUNT = 'CHANGE_COUNT';


function getAllIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_ALL_INGREDIENTS
    })

    fetch(dataUrl)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch({
            type: GET_ALL_INGREDIENTS_FAILED
          })
        }
      })
      .then (res => {
        dispatch({
          type: GET_ALL_INGREDIENTS_SUCCESS,
          data: res.data
        })
      })
      .catch(err => dispatch({
        type: GET_ALL_INGREDIENTS_FAILED
      }))
  }
};

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

export {GET_ALL_INGREDIENTS, GET_ALL_INGREDIENTS_SUCCESS, GET_ALL_INGREDIENTS_FAILED, getAllIngredients,
  GET_CURRENT_INGREDIENT, getCurrentIngredient, GET_CURRENT_INGREDIENT_SUCCESS, GET_CURRENT_INGREDIENT_FAILED,
  GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILED, getOrder, CLOSE_ORDER, closeOrder, ADD_TO_CONSTRUCTOR, DELETE_FROM_CONSTRUCTOR, CHANGE_COUNT};
