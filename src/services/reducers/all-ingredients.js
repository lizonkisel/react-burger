import {GET_ALL_INGREDIENTS, GET_ALL_INGREDIENTS_SUCCESS, GET_ALL_INGREDIENTS_FAILED} from '../actions/all-ingredients.js';

const initialState = {};

const allIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INGREDIENTS: {
      return state
    }
    case GET_ALL_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        items: action.data
      }
    }
    case GET_ALL_INGREDIENTS_FAILED: {
      console.log('Fail');
      return state;
    }
    default:
      return state
  }
};

export {allIngredientsReducer};
