import {REGISTER, REGISTER_SUCCESS, REGISTER_FAILED} from '../actions/register.js';
import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILED} from '../actions/login.js';
import {RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, RECOVER_PASSWORD, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_FAILED, recoverPassword, resetPassword} from '../actions/password.js';
import {GET_USER, GET_USER_SUCCESS, GET_USER_FAILED, EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_FAILED} from '../actions/user.js' ;
import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED } from '../actions/logout.js';
import {setCookie, getCookie} from '../../utils/utils.js';

const initialState = {
  isLoading: false,
  isFailed: false,
  user: null,
  accessToken: null,
  isAuth: false,
  isAuthChecked: false,
  isLogout: false
  // isLogoutChecked: false
};

const authReducer = (state = initialState, action) => {
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

      console.log(getCookie('token'));
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
        isLogout: action.isLogout
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLoading: action.isLoading,
        isFailed: action.isFailed,
        isAuth: action.isAuth,
        isLogout: action.isLogout
      }
    }

    case RECOVER_PASSWORD: {
      console.log('1');
      return {
        ...state,
      }
    }
    case RECOVER_PASSWORD_SUCCESS: {
      console.log('Recover success');
      return {
        ...state,
      }
    }
    case RECOVER_PASSWORD_FAILED: {
      console.log('Recover failed');
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
        // isLoading: action.isLoading,
        // isFailed: action.isFailed,
        isAuth: action.isAuth,
        isAuthChecked: action.isAuthChecked
      }
    }
    case GET_USER_SUCCESS: {
      // localStorage.setItem('refreshToken', action.refreshToken);

      console.log('Get user');

      return {
        ...state,
        // isLoading: action.isLoading,
        // isFailed: action.isFailed,
        user: action.user,
        isAuth: action.isAuth,
        isAuthChecked: action.isAuthChecked,
        isLogout: action.isLogout
        // accessToken: action.accessToken,
        // isAuth: action.isAuth
      }
    }
    case GET_USER_FAILED: {

      return {
        ...state,
        isAuth: action.isAuth,
        isAuthChecked: action.isAuthChecked,
        isLogout: action.isLogout
        // isLoading: action.isLoading,
        // isFailed: action.isFailed,
        // isAuth: action.isAuth
      }
    }

    case EDIT_USER: {
      return {
        ...state,
        // isLoading: action.isLoading,
        // isFailed: action.isFailed,
        // isAuth: action.isAuth
      }
    }
    case EDIT_USER_SUCCESS: {
      // localStorage.setItem('refreshToken', action.refreshToken);

      return {
        ...state,
        // isLoading: action.isLoading,
        // isFailed: action.isFailed,
        user: action.user,
        // accessToken: action.accessToken,
        // isAuth: action.isAuth
      }
    }
    case EDIT_USER_FAILED: {
      return {
        ...state,
        // isLoading: action.isLoading,
        // isFailed: action.isFailed,
        // isAuth: action.isAuth
      }
    }

    case LOGOUT: {
      return {
        ...state,
        isLogout: action.isLogout
      }
    }

    case LOGOUT_SUCCESS: {
      // setCookie('token', null, { expires: -1 });
      // console.log(getCookie('token'));
      // localStorage.setItem('refreshToken', null);

      // console.log('logout');
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        isAuth: action.isAuth,
        isAuthChecked: action.isAuthChecked,
        isLogout: action.isLogout
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        isLogout: action.isLogout
      }
    }

    default:
      return state
  }
}

export {authReducer};
