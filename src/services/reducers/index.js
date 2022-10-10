import { combineReducers } from "redux";

import {allIngredientsReducer} from './all-ingredients';
import { orderReducer } from "./order";
import {constructorIngredientsReducer} from './constructor-ingredients';
import { authReducer } from "./auth";
import { wsReducer } from "./wsReducer";


const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  order: orderReducer,
  constructorIngredients: constructorIngredientsReducer,
  auth: authReducer,
  ws: wsReducer
});

export {rootReducer};
