// const GET_CURRENT_INGREDIENT = 'GET_CURRENT_INGREDIENTS';
// const GET_CURRENT_INGREDIENT_SUCCESS = 'GET_CURRENT_INGREDIENTS_SUCCESS';
// const GET_CURRENT_INGREDIENT_FAILED = 'GET_CURRENT_INGREDIENTS_FAILED';

import {GET_CURRENT_INGREDIENT, GET_CURRENT_INGREDIENT_SUCCESS, GET_CURRENT_INGREDIENT_FAILED} from '../constants/index';
import {TIngredient} from '../types/server-data';

interface IGetCurrentIngredientAction {
  readonly type: typeof GET_CURRENT_INGREDIENT,
  readonly item: TIngredient
}

export type TCurrentIngredientAction = IGetCurrentIngredientAction;

function getCurrentIngredient(item: TIngredient): IGetCurrentIngredientAction {
  return {
    type: GET_CURRENT_INGREDIENT,
    item
  }
};

// export {GET_CURRENT_INGREDIENT, getCurrentIngredient, GET_CURRENT_INGREDIENT_SUCCESS, GET_CURRENT_INGREDIENT_FAILED};
export {getCurrentIngredient};

