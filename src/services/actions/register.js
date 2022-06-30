import {baseUrl, checkResponse} from '../../utils/data.js';

const REGISTER = 'REGISTER';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILED = 'REGISTER_FAILED';

function register() {
  return function(dispatch) {
    dispatch({
      type: REGISTER,
      isLoading: true,
      isFailed: false,
      isAuth: false
    })

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
          "email": "lizonkisel9@mail.ru",
          "password": "testtest",
          "name": "test"
        })
      }
    )
    .then(checkResponse)
    .then(res => dispatch({
      type: REGISTER_SUCCESS,
      isLoading: false,
      isFailed: false,
      user: res.user,
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      isAuth: true
    }))
    .catch(err => dispatch({
      type: REGISTER_FAILED,
      isLoading: false,
      isFailed: true,
      isAuth: false
    }))
  }
}

export {REGISTER, REGISTER_SUCCESS, REGISTER_FAILED, register};
