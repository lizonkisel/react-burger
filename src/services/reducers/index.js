import { combineReducers } from "redux";

import {allIngredientsReducer} from './all-ingredients.js';
import {currentIngredientReducer} from './current-ingredient.js';
import { orderReducer } from "./order.js";
import {constructorIngredientsReducer} from './constructor-ingredients.js';

const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  constructorIngredients: constructorIngredientsReducer
});

export {rootReducer};
