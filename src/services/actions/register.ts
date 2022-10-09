import {baseUrl, checkResponse} from '../../utils/utils';
import { AppDispatch, AppThunk } from '../types';

import {REGISTER, REGISTER_SUCCESS, REGISTER_FAILED} from '../constants/index';

// const REGISTER = 'REGISTER';
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// const REGISTER_FAILED = 'REGISTER_FAILED';

interface IRegisterAction {
  readonly type: typeof REGISTER,
  readonly isLoading: true,
  readonly isFailed: false,
  readonly isAuth: false
}

interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS,
  readonly isLoading: false,
  readonly isFailed: false,
  readonly user: string,
  readonly accessToken: string,
  readonly refreshToken: string,
  readonly isAuth: true
}

interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED,
  readonly isLoading: false,
  readonly isFailed: true,
  readonly isAuth: false
}

export type TRegisterActions =
  IRegisterAction |
  IRegisterSuccessAction |
  IRegisterFailedAction
;

function registerAction(): IRegisterAction {
  return {
    type: REGISTER,
    isLoading: true,
    isFailed: false,
    isAuth: false
  }
};

// Убрать any
function registerSuccessAction(res: any): IRegisterSuccessAction {
  return {
    type: REGISTER_SUCCESS,
    isLoading: false,
    isFailed: false,
    user: res.user,
    accessToken: res.accessToken,
    refreshToken: res.refreshToken,
    isAuth: true
  }
};

function registerFailedAction(): IRegisterFailedAction {
  return {
    type: REGISTER_FAILED,
    isLoading: false,
    isFailed: true,
    isAuth: false
  }
};


// function register(name, email, password) {
const register: AppThunk = (name: string, email: string, password: string) => {
  console.log(name, email, password);

  return function(dispatch: AppDispatch) {
    // dispatch({
    //   type: REGISTER,
    //   isLoading: true,
    //   isFailed: false,
    //   isAuth: false
    // })
    dispatch(registerAction())

    fetch(`${baseUrl}/auth/register`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          "email": email,
          "password": password,
          "name": name
        })
      }
    )
    .then(checkResponse)
    .then(res =>
      // dispatch({
      //   type: REGISTER_SUCCESS,
      //   isLoading: false,
      //   isFailed: false,
      //   user: res.user,
      //   accessToken: res.accessToken,
      //   refreshToken: res.refreshToken,
      //   isAuth: true
      // })
      dispatch(registerSuccessAction(res))
    )
    .catch(err =>
      // dispatch({
      //   type: REGISTER_FAILED,
      //   isLoading: false,
      //   isFailed: true,
      //   isAuth: false
      // })
      dispatch(registerFailedAction())
    )
  }
}

// export {REGISTER, REGISTER_SUCCESS, REGISTER_FAILED, register};
export {register};
