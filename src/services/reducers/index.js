import { combineReducers } from "redux";

import {allIngredientsReducer} from './all-ingredients.js';
import {currentIngredientReducer} from './current-ingredient.js';
import { orderReducer } from "./order.js";
import {constructorIngredientsReducer} from './constructor-ingredients.js';
import { registerReducer } from "./register.js";
import { loginReducer } from "./login.js";

// const routingReducer = combineReducers({

// })

const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  constructorIngredients: constructorIngredientsReducer,

  register: registerReducer,
  login: loginReducer
});

export {rootReducer};
