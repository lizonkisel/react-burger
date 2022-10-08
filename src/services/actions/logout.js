import {baseUrl, checkResponse} from '../../utils/utils.ts';
import {LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED} from '../constants/index.ts';

// const LOGOUT = 'LOGOUT';
// const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
// const LOGOUT_FAILED = 'LOGOUT_FAILED';

function logout() {

  return function(dispatch) {
    dispatch({
      type: LOGOUT,
      isLogoutChecked: false
    })

    fetch(`${baseUrl}/auth/logout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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
        isAuthChecked: true,
        isLogoutChecked: true
    })})
    .catch(err => {
      console.log(err)
      dispatch({
        type: LOGOUT_FAILED,
        // isLogoutChecked: false
        isLogoutChecked: true
    })})
  }
}

// export {LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED, logout};
export {logout};
