import {dataUrl} from '../../utils/data.js';

const GET_ALL_INGREDIENTS = 'GET_ALL_INGREDIENTS';
const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
const GET_ALL_INGREDIENTS_FAILED = 'GET_ALL_INGREDIENTS_FAILED';

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

export {GET_ALL_INGREDIENTS, GET_ALL_INGREDIENTS_SUCCESS, GET_ALL_INGREDIENTS_FAILED, getAllIngredients};
