import {baseUrl, checkResponse} from '../../utils/utils.js';

const LOGOUT = 'LOGOUT';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILED = 'LOGOUT_FAILED';

function logout() {

  return function(dispatch) {
    dispatch({
      type: LOGOUT,
    })

    fetch(`${baseUrl}/auth/logout`,
      {
        method: 'POST',
        // mode: 'cors',
        // cache: 'no-cache',
        // credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        // redirect: 'follow',
        // referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          "token": localStorage.getItem('refreshToken')
        })
      }
    )
    .then(checkResponse)
    .then(res => {
      console.log(res)
      dispatch({
        type: LOGOUT_SUCCESS,
        user: null,
        accessToken: null,
        isAuth: false,
        isAuthChecked: false
    })})
    .catch(err => {
      console.log(err)
      dispatch({
        type: LOGOUT_FAILED,
    })})
  }
}

export {LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED, logout};
