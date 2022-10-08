import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import {TAllIngredientsActions} from '../actions/all-ingredients';

import { useDispatch as dispatchHook } from 'react-redux';


// TApplicationActions дополнить всеми типами экшенов
type TApplicationActions = TAllIngredientsActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
