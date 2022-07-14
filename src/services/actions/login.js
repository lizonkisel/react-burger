import {baseUrl, checkResponse} from '../../utils/utils.js';

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';

function login(email, password) {

  return function(dispatch) {
    dispatch({
      type: LOGIN,
      isLoading: true,
      isFailed: false,
      isAuth: false
    })

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
    .then(checkResponse)
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      isLoading: false,
      isFailed: false,
      user: res.user,
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      isAuth: true,
      isLogout: true
    }))
    .catch(err => dispatch({
      type: LOGIN_FAILED,
      isLoading: false,
      isFailed: true,
      isAuth: false,
      isLogout: true
    }))
  }
}

export {LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, login};
