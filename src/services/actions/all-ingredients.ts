import {baseUrl, checkResponse} from '../../utils/utils';

import { AppDispatch, AppThunk } from '../types';

import {GET_ALL_INGREDIENTS, GET_ALL_INGREDIENTS_SUCCESS, GET_ALL_INGREDIENTS_FAILED} from '../constants/index';
import {TIngredient} from '../types/server-data';
import { TAllIngredientsResponse } from '../types/server-data';

interface IGetAllIngredientsAction {
  readonly type: typeof GET_ALL_INGREDIENTS,
  readonly isLoading: true,
  readonly isFailed: false,
}

interface IGetAllIngredientsSuccessAction {
  readonly type: typeof GET_ALL_INGREDIENTS_SUCCESS,
  readonly isLoading: false,
  readonly isFailed: false,
  readonly items: ReadonlyArray<TIngredient>
}

interface IGetAllIngredientsFailedAction {
  readonly type: typeof GET_ALL_INGREDIENTS_FAILED,
  readonly isLoading: false,
  readonly isFailed: true,
}

export type TAllIngredientsActions =
  IGetAllIngredientsAction |
  IGetAllIngredientsSuccessAction |
  IGetAllIngredientsFailedAction
;

function getAllIngredientsAction(): IGetAllIngredientsAction {
  return {
    type: GET_ALL_INGREDIENTS,
    isLoading: true,
    isFailed: false,
  }
};

function getAllIngredientsSuccessAction(data: ReadonlyArray<TIngredient>): IGetAllIngredientsSuccessAction {
  return {
    type: GET_ALL_INGREDIENTS_SUCCESS,
    isLoading: false,
    isFailed: false,
    items: data
  }
};

function getAllIngredientsFailedAction(): IGetAllIngredientsFailedAction {
  return {
    type: GET_ALL_INGREDIENTS_FAILED,
    isLoading: false,
    isFailed: true,
  }
};


const getAllIngredients: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch(getAllIngredientsAction())

    fetch(`${baseUrl}/ingredients`)
      .then(res => checkResponse<TAllIngredientsResponse>(res))
      .then ((res) => {
        dispatch(getAllIngredientsSuccessAction(res.data))
      })
      .catch(err =>
        dispatch(getAllIngredientsFailedAction())
      )
  }
};

export {getAllIngredients};
