import {baseUrl, checkResponse} from '../../utils/utils';
import { AppDispatch, AppThunk } from '../types';

import {LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED} from '../constants/index';

interface ILogoutAction {
  readonly type: typeof LOGOUT,
  readonly isLogoutChecked: false
}

interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS,
  readonly user: null,
  readonly accessToken: null,
  readonly isAuth: false,
  readonly isAuthChecked: true,
  readonly isLogoutChecked: true
}

interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED,
  readonly isLogoutChecked: true
}

export type TLogoutActions =
  ILogoutAction |
  ILogoutSuccessAction |
  ILogoutFailedAction
;

function logoutAction(): ILogoutAction {
  return {
    type: LOGOUT,
    isLogoutChecked: false
  }
};

function logoutSuccessAction(): ILogoutSuccessAction {
  return {
    type: LOGOUT_SUCCESS,
    user: null,
    accessToken: null,
    isAuth: false,
    isAuthChecked: true,
    isLogoutChecked: true
  }
};

function logoutFailedAction(): ILogoutFailedAction {
  return {
    type: LOGOUT_FAILED,
    isLogoutChecked: true
  }
};

const logout: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch(logoutAction())

    fetch(`${baseUrl}/auth/logout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "token": localStorage.getItem('refreshToken')
        })
      }
    )
    .then(checkResponse)
    .then(res => {
      dispatch(logoutSuccessAction())
    })
    .catch(err => {
      dispatch(logoutFailedAction())
    })
  }
}

export {logout};
