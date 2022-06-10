import {GET_CURRENT_INGREDIENT, GET_CURRENT_INGREDIENT_SUCCESS,
  GET_CURRENT_INGREDIENT_FAILED} from '../actions/current-ingredient.js';


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
    default:
      return state
  }
};

export {currentIngredientReducer};
