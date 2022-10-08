import { v4 as uuidv4 } from 'uuid';

import {ADD_TO_CONSTRUCTOR, DELETE_FROM_CONSTRUCTOR, REORDER_INGREDIENT} from '../constants/index.ts';

// const REORDER_INGREDIENT = 'REORDER_INGREDIENT';
// const ADD_TO_CONSTRUCTOR = 'ADD_TO_CONSTRUCTOR';
// const DELETE_FROM_CONSTRUCTOR = 'DELETE_FROM_CONSTRUCTOR';


// Это нигде не используется
// const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

function addToConstructor(item) {
  return {
    type: ADD_TO_CONSTRUCTOR,
    item: item,
    uId: uuidv4()
  }
}

function deleteFromConstructor(item, key) {
  return {
    type: DELETE_FROM_CONSTRUCTOR,
    item: item,
    key: key
  }
}

function reorderIngredient(dragIndex, hoverIndex) {
  return {
    type: REORDER_INGREDIENT,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex
  }
}


// export { ADD_TO_CONSTRUCTOR, DELETE_FROM_CONSTRUCTOR, REORDER_INGREDIENT, addToConstructor, deleteFromConstructor, reorderIngredient};

export {addToConstructor, deleteFromConstructor, reorderIngredient};
