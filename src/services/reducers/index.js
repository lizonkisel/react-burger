import { combineReducers } from "redux";
import {GET_ALL_INGREDIENTS, GET_ALL_INGREDIENTS_SUCCESS, GET_ALL_INGREDIENTS_FAILED,
  GET_CURRENT_INGREDIENT, GET_CURRENT_INGREDIENT_SUCCESS, GET_CURRENT_INGREDIENT_FAILED,
  GET_ORDER, GET_ORDER_SUCCESS, CLOSE_ORDER, ADD_TO_CONSTRUCTOR, DELETE_FROM_CONSTRUCTOR, CHANGE_COUNT} from '../actions/index.js';


const initialState = {};

const orderInitialState = {
  isOrderAccepted: false,
  number: null,
  isReadyForNewOrder: true
};

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

const currentIngredientReducer = (state = null, action) => {
  switch (action.type) {
    case GET_CURRENT_INGREDIENT: {
      if (action.item === null) {
        return null
      } else {
        return {
          ...state,
          id: action.item._id,
          name: action.item.name,
          type: action.item.type,
          proteins: action.item.proteins,
          fat: action.item.fat,
          carbohydrates: action.item.carbohydrates,
          calories: action.item.calories,
          price: action.item.orice,
          image: action.item.image,
          image_mobile: action.item.image_mobile,
          image_large: action.item.image_large,
          __v: action.item.__v
        }
      }
    }
    case GET_CURRENT_INGREDIENT_SUCCESS: {
      return {
        ...state,
        item: action.item
      }
    }
    case GET_CURRENT_INGREDIENT_FAILED: {
      console.log('Fail');
      return state;
    }
    default:
      return state
  }
};

const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case GET_ORDER: {
      return state
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        number: action.number,
        isOrderAccepted: action.isOrderAccepted,
        isReadyForNewOrder: false
      }
    }
    case CLOSE_ORDER: {
      return {
        ...state,
        isReadyForNewOrder: true
      }
    }
    default:
      return state
  }
};

const constructorInitialState = {
  ingredients: [],
  ingredientsCount: []
}

const constructorIngredientsReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    case ADD_TO_CONSTRUCTOR: {
      let arr = [...state.ingredientsCount];

      const sameIndex = arr.findIndex(element => element.itemId === action.item._id);
      const sameElement = arr[sameIndex];
      sameIndex === -1 ?
      arr.push({itemId: action.item._id, count: 1}) :
      arr.splice(sameIndex, 1, {itemId: sameElement.itemId, count: sameElement.count + 1});

      return {
        ...state,
        ingredients: [...state.ingredients, action.item],
        ingredientsCount: arr
      }
    }
    case DELETE_FROM_CONSTRUCTOR: {
      const spliceArr = [...state.ingredients];
      spliceArr.splice(action.key, 1);

      let arr = [...state.ingredientsCount];
      const sameIndex = arr.findIndex(element => element.itemId === action.item._id);
      const sameElement = arr[sameIndex];
      sameElement.count === 1 ?
      arr.splice(sameIndex, 1) :
      arr.splice(sameIndex, 1, {itemId: sameElement.itemId, count: sameElement.count - 1});


      return {
        ...state,
        ingredients: spliceArr,
        ingredientsCount: arr
      }
    }
    default:
      return state
  }
};



const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  constructorIngredients: constructorIngredientsReducer
});

export {rootReducer};
