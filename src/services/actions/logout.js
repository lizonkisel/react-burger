import {baseUrl, checkResponse} from '../../utils/data.js';

const LOGOUT = 'LOGOUT';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILED = 'LOGOUT_FAILED';

function logout() {

  return function(dispatch) {
    dispatch({
      type: LOGOUT,
    })

    fetch(`${baseUrl}/auth/token`,
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
          "token": localStorage.getItem('refreshToken')
        })
      }
    )
    .then(checkResponse)
    .then(res => dispatch({
      type: LOGOUT_SUCCESS
    }))
    .catch(err => dispatch({
      type: LOGOUT_FAILED,
    }))
  }
}

export {LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED, logout};
