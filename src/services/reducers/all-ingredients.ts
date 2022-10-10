// import {GET_ALL_INGREDIENTS, GET_ALL_INGREDIENTS_SUCCESS, GET_ALL_INGREDIENTS_FAILED} from '../actions/all-ingredients.js';
import {GET_ALL_INGREDIENTS, GET_ALL_INGREDIENTS_SUCCESS, GET_ALL_INGREDIENTS_FAILED} from '../constants/index';
import { TAllIngredientsActions } from '../actions/all-ingredients';
import {TIngredient} from '../types/server-data';

type TAllIngredientsState = {
  isLoading: boolean;
  isFailed: boolean,
  items: ReadonlyArray<TIngredient> | null
};

const initialState: TAllIngredientsState = {
  isLoading: false,
  isFailed: false,
  items: null
};


const allIngredientsReducer = (state = initialState, action: TAllIngredientsActions): TAllIngredientsState => {
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
