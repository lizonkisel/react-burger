import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import {TAllIngredientsActions} from '../actions/all-ingredients';
import { TIngredientInConstructorActions } from '../actions/constructor-ingredients';
import { TLoginActions } from '../actions/login';
import { TLogoutActions } from '../actions/logout';
import { TOrderActions } from '../actions/order';
import { TPasswordActions } from '../actions/password';
import { TRegisterActions } from '../actions/register';
import { TUserActions } from '../actions/user';
import { TWsActions } from '../actions/wsActions';
import { rootReducer } from '../reducers';

// import { useDispatch as dispatchHook } from 'react-redux';


// TApplicationActions дополнить всеми типами экшенов
type TApplicationActions =
  TAllIngredientsActions |
  TIngredientInConstructorActions |
  TLoginActions |
  TLogoutActions |
  TOrderActions |
  TPasswordActions |
  TRegisterActions |
  TUserActions |
  TWsActions
;

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
