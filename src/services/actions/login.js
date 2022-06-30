import {baseUrl, checkResponse} from '../../utils/data.js';

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';

function login() {
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
          "email": "lizonkisel9@mail.ru",
          "password": "testtest"
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
      isAuth: true
    }))
    .catch(err => dispatch({
      type: LOGIN_FAILED,
      isLoading: false,
      isFailed: true,
      isAuth: false
    }))
  }
}

export {LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, login};
