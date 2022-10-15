import {baseUrl, checkResponse} from '../../utils/utils';

import { AppDispatch, AppThunk } from '../types';

import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILED} from '../constants/index';
import { TUser } from '../types/server-data';
import { TLoginResponse } from '../types/server-data';

// const LOGIN = 'LOGIN';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// const LOGIN_FAILED = 'LOGIN_FAILED';

interface ILoginAction {
  readonly type: typeof LOGIN,
  readonly isLoading: true,
  readonly isFailed: false,
  readonly isAuth: false
}

interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS,
  readonly isLoading: false,
  readonly isFailed: false,
  readonly user: TUser,
  readonly accessToken: string,
  readonly refreshToken: string,
  readonly isAuth: true,
  readonly isLogoutChecked: true
}

interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED,
  readonly isLoading: false,
  readonly isFailed: true,
  readonly isAuth: false,
  readonly isLogoutChecked: true
}

export type TLoginActions =
  ILoginAction |
  ILoginSuccessAction |
  ILoginFailedAction
;

function loginAction(): ILoginAction {
  return {
    type: LOGIN,
    isLoading: true,
    isFailed: false,
    isAuth: false
  }
};

function loginSuccessAction(res: TLoginResponse): ILoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
    isLoading: false,
    isFailed: false,
    user: res.user,
    accessToken: res.accessToken,
    refreshToken: res.refreshToken,
    isAuth: true,
    isLogoutChecked: true
  }
};

function loginFailedAction(): ILoginFailedAction {
  return {
    type: LOGIN_FAILED,
    isLoading: false,
    isFailed: true,
    isAuth: false,
    isLogoutChecked: true
  }
};


// function login(email: string, password: string) {
const login: AppThunk = (email: string, password: string) => {
  return function(dispatch: AppDispatch) {
    // dispatch({
    //   type: LOGIN,
    //   isLoading: true,
    //   isFailed: false,
    //   isAuth: false
    // })
    dispatch(loginAction())

    fetch(`${baseUrl}/auth/login`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          "email": email,
          "password": password
        })
      }
    )
    .then(res => checkResponse<TLoginResponse>(res))
    .then((res) =>
      // dispatch({
      //   type: LOGIN_SUCCESS,
      //   isLoading: false,
      //   isFailed: false,
      //   user: res.user,
      //   accessToken: res.accessToken,
      //   refreshToken: res.refreshToken,
      //   isAuth: true,
      //   isLogoutChecked: true
      // })
      dispatch(loginSuccessAction(res))
    )
    .catch(err =>
      // dispatch({
      //   type: LOGIN_FAILED,
      //   isLoading: false,
      //   isFailed: true,
      //   isAuth: false,
      //   isLogoutChecked: true
      // })
      dispatch(loginFailedAction())
    )
  }
}

// export {LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, login};
export {login};
