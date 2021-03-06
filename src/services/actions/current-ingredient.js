const GET_CURRENT_INGREDIENT = 'GET_CURRENT_INGREDIENTS';
const GET_CURRENT_INGREDIENT_SUCCESS = 'GET_CURRENT_INGREDIENTS_SUCCESS';
const GET_CURRENT_INGREDIENT_FAILED = 'GET_CURRENT_INGREDIENTS_FAILED';

function getCurrentIngredient(item) {
  return {
    type: GET_CURRENT_INGREDIENT,
    item
  }
};

export {GET_CURRENT_INGREDIENT, getCurrentIngredient, GET_CURRENT_INGREDIENT_SUCCESS, GET_CURRENT_INGREDIENT_FAILED}
