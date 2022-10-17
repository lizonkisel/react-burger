import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
  LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED,
  RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED,
  RECOVER_PASSWORD, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_FAILED,
  REGISTER, REGISTER_SUCCESS, REGISTER_FAILED,
  GET_USER, GET_USER_SUCCESS, GET_USER_FAILED, EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_FAILED
} from '../constants/index';
import { TLoginActions } from '../actions/login';
import { TLogoutActions } from '../actions/logout';
import { TPasswordActions } from '../actions/password';
import { TRegisterActions } from '../actions/register';
import { TUserActions } from '../actions/user';

import { TUser } from '../types/server-data';

import {recoverPassword, resetPassword} from '../actions/password';
import {setCookie, getCookie} from '../../utils/utils';

type TAuthActions =
  TLoginActions |
  TLogoutActions |
  TPasswordActions |
  TRegisterActions |
  TUserActions
;

type TAuthState = {
  isLoading: boolean;
  isFailed: boolean,
  user: TUser | null,
  accessToken: string | null,
  isAuth: boolean,
  isAuthChecked: boolean,
  isLogoutChecked: boolean
}

const initialState: TAuthState = {
  isLoading: false,
  isFailed: false,
  user: null,
  accessToken: null,
  isAuth: false,
  isAuthChecked: false,
  isLogoutChecked: false
};

const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
  switch (action.type) {
    case REGISTER: {
      return {
        ...state,
        isLoading: action.isLoading,
        isFailed: action.isFailed,
        isAuth: action.isAuth
      }
    }
    case REGISTER_SUCCESS: {
      localStorage.setItem('refreshToken', action.refreshToken);
      setCookie('token', action.accessToken.split('Bearer ')[1]);

      return {
        ...state,
        isLoading: action.isLoading,
        isFailed: action.isFailed,
        user: action.user,
        accessToken: action.accessToken,
        isAuth: action.isAuth
      }
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        isLoading: action.isLoading,
        isFailed: action.isFailed,
        isAuth: action.isAuth
      }
    }

    case LOGIN: {
      return {
        ...state,
        isLoading: action.isLoading,
        isFailed: action.isFailed,
        isAuth: action.isAuth
      }
    }
    case LOGIN_SUCCESS: {
      setCookie('token', action.accessToken.split('Bearer ')[1]);
      localStorage.setItem('refreshToken', action.refreshToken);

      return {
        ...state,
        isLoading: action.isLoading,
        isFailed: action.isFailed,
        user: action.user,
        accessToken: action.accessToken,
        isAuth: action.isAuth,
        isLogoutChecked: action.isLogoutChecked
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLoading: action.isLoading,
        isFailed: action.isFailed,
        isAuth: action.isAuth,
        isLogoutChecked: action.isLogoutChecked
      }
    }

    case RECOVER_PASSWORD: {
      return {
        ...state,
      }
    }
    case RECOVER_PASSWORD_SUCCESS: {
      return {
        ...state,
      }
    }
    case RECOVER_PASSWORD_FAILED: {
      return {
        ...state,
      }
    }

    case RESET_PASSWORD: {
      return {
        ...state,
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
      }
    }

    case GET_USER: {
      return {
        ...state,
        isAuth: action.isAuth,
        isAuthChecked: action.isAuthChecked
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        isAuth: action.isAuth,
        isAuthChecked: action.isAuthChecked,
        isLogoutChecked: action.isLogoutChecked
      }
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        isAuth: action.isAuth,
        isAuthChecked: action.isAuthChecked,
        isLogoutChecked: action.isLogoutChecked
      }
    }

    case EDIT_USER: {
      return {
        ...state,
      }
    }
    case EDIT_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
      }
    }

    case EDIT_USER_FAILED: {
      return {
        ...state
      }
    }

    case LOGOUT: {
      return {
        ...state,
        isLogoutChecked: action.isLogoutChecked
      }
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        isAuth: action.isAuth,
        isAuthChecked: action.isAuthChecked,
        isLogoutChecked: action.isLogoutChecked
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        isLogoutChecked: action.isLogoutChecked
      }
    }

    default:
      return state
  }
}

export {authReducer};
