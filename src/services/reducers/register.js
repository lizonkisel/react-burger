import {REGISTER, REGISTER_SUCCESS, REGISTER_FAILED} from '../actions/register.js';
import {setCookie, getCookie} from '../../utils/data.js';

const initialState = {
  isLoading: false,
  isFailed: false,
  user: {
    email: "",
    name: ""
  },
  accessToken: null,
  isAuth: false
};

const registerReducer = (state = initialState, action) => {
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
      setCookie('token', action.accessToken);
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
    default:
      return state
  }
}

export {registerReducer};
