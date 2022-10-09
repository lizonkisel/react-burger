import { v4 as uuidv4 } from 'uuid';

import {ADD_TO_CONSTRUCTOR, DELETE_FROM_CONSTRUCTOR, REORDER_INGREDIENT} from '../constants/index';
import {TIngredient} from '../types/server-data';

// const REORDER_INGREDIENT = 'REORDER_INGREDIENT';
// const ADD_TO_CONSTRUCTOR = 'ADD_TO_CONSTRUCTOR';
// const DELETE_FROM_CONSTRUCTOR = 'DELETE_FROM_CONSTRUCTOR';


// Это нигде не используется
// const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

interface IAddToConstructorAction {
  readonly type: typeof ADD_TO_CONSTRUCTOR,
  readonly item: TIngredient,
  readonly uId: string
}

interface IDeleteFromConstructorAction {
  readonly type: typeof DELETE_FROM_CONSTRUCTOR,
  readonly item: TIngredient,
  readonly key: number
}

interface IReorderIngredientAction {
  readonly type: typeof REORDER_INGREDIENT,
  readonly dragIndex: number,
  readonly hoverIndex: number
}

export type TIngredientInConstructorActions =
  IAddToConstructorAction |
  IDeleteFromConstructorAction |
  IReorderIngredientAction
;


function addToConstructor(item: TIngredient): IAddToConstructorAction {
  return {
    type: ADD_TO_CONSTRUCTOR,
    item: item,
    uId: uuidv4()
  }
};

function deleteFromConstructor(item: TIngredient, key: number): IDeleteFromConstructorAction {
  return {
    type: DELETE_FROM_CONSTRUCTOR,
    item: item,
    key: key
  }
};

function reorderIngredient(dragIndex: number, hoverIndex: number): IReorderIngredientAction {
  return {
    type: REORDER_INGREDIENT,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex
  }
};


// export { ADD_TO_CONSTRUCTOR, DELETE_FROM_CONSTRUCTOR, REORDER_INGREDIENT, addToConstructor, deleteFromConstructor, reorderIngredient};

export {addToConstructor, deleteFromConstructor, reorderIngredient};
