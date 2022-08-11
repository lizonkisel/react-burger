import { ADD_TO_CONSTRUCTOR, DELETE_FROM_CONSTRUCTOR, REORDER_INGREDIENT } from '../actions/constructor-ingredients.js';
import update from 'immutability-helper'
// import { v4 as uuidv4 } from 'uuid';

const constructorInitialState = {
  ingredients: {
    bun: null,
    fillings: []
  },
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
        ingredients: (
          action.item.type === 'bun' ?
          {bun: action.item, fillings: [...state.ingredients.fillings]} :
          {...state.ingredients, fillings: [...state.ingredients.fillings, {...action.item, uId: action.uId }]}
        ),
        ingredientsCount: (
          action.item.type === 'bun' ?
          [...state.ingredientsCount] :
          arr
        )
      }
    }
    case DELETE_FROM_CONSTRUCTOR: {
      const spliceArr = [...state.ingredients.fillings];
      spliceArr.splice(action.key, 1);

      let arr = [...state.ingredientsCount];
      const sameIndex = arr.findIndex(element => element.itemId === action.item._id);
      const sameElement = arr[sameIndex];
      sameElement.count === 1 ?
      arr.splice(sameIndex, 1) :
      arr.splice(sameIndex, 1, {itemId: sameElement.itemId, count: sameElement.count - 1});


      return {
        ...state,
        ingredients: {...state.ingredients, fillings: spliceArr},
        ingredientsCount: arr
      }
    }
    case REORDER_INGREDIENT: {
      return {
        ...state,
        ingredients: { ...state.ingredients,
        fillings: update(state.ingredients.fillings, {
          $splice: [
            [action.dragIndex, 1],
            [action.hoverIndex, 0, state.ingredients.fillings[action.dragIndex]],
          ],
        })
      }
      }
    }
    // case CLEAR_CONSTRUCTOR: {
    //   return {
    //     ...state,
    //     ingredients: null,
    //     ingredientsCount: null
    //   }
    // }
    default:
      return state
  }
};

export {constructorIngredientsReducer};
