// import {GET_ALL_INGREDIENTS, GET_ALL_INGREDIENTS_SUCCESS, GET_ALL_INGREDIENTS_FAILED} from '../actions/all-ingredients.js';
import {GET_ALL_INGREDIENTS, GET_ALL_INGREDIENTS_SUCCESS, GET_ALL_INGREDIENTS_FAILED} from '../constants/index.ts';

const initialState = {
  isLoading: false,
  isFailed: false,
  items: null
};

const allIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INGREDIENTS: {
      return {
        ...state,
        isLoading: action.isLoading,
        isFailed: action.isFailed,
      }
    }
    case GET_ALL_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoading: action.isLoading,
        isFailed: action.isFailed,
        items: action.items
      }
    }
    case GET_ALL_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: action.isLoading,
        isFailed: action.isFailed,
      };
    }
    default:
      return state
  }
};

export {allIngredientsReducer};
