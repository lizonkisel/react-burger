import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILED} from '../actions/login.js';

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

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isLoading: action.isLoading,
        isFailed: action.isFailed,
        isAuth: action.isAuth
      }
    }
    case LOGIN_SUCCESS: {
      localStorage.setItem('refreshToken', action.refreshToken);

      return {
        ...state,
        isLoading: action.isLoading,
        isFailed: action.isFailed,
        user: action.user,
        accessToken: action.accessToken,
        isAuth: action.isAuth
      }
    }
    case LOGIN_FAILED: {
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

export {loginReducer};
