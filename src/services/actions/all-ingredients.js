import {baseUrl, checkResponse} from '../../utils/utils.ts';

const GET_ALL_INGREDIENTS = 'GET_ALL_INGREDIENTS';
const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
const GET_ALL_INGREDIENTS_FAILED = 'GET_ALL_INGREDIENTS_FAILED';

function getAllIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_ALL_INGREDIENTS,
      isLoading: true,
      isFailed: false,
    })

    fetch(`${baseUrl}/ingredients`)
      .then(checkResponse)
      .then (res => {
        dispatch({
          type: GET_ALL_INGREDIENTS_SUCCESS,
          isLoading: false,
          isFailed: false,
          items: res.data
        })
      })
      .catch(err => dispatch({
        type: GET_ALL_INGREDIENTS_FAILED,
        isLoading: false,
        isFailed: true,
      }))
  }
};

export {GET_ALL_INGREDIENTS, GET_ALL_INGREDIENTS_SUCCESS, GET_ALL_INGREDIENTS_FAILED, getAllIngredients};
