import {baseUrl, checkResponse, getCookie, fetchWithRefresh} from '../../utils/utils.js';
console.log(getCookie('token'));

const GET_USER = 'GET_USER';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_FAILED = 'GET_USER_FAILED';

const EDIT_USER = 'EDIT_USER';
const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
const EDIT_USER_FAILED = 'EDIT_USER_FAILED';

function getUser() {

  return function(dispatch) {
    dispatch({
      type: GET_USER,
      isAuth: false,
      isAuthChecked: false
    })

    fetchWithRefresh(`${baseUrl}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
        // Authorization: getCookie('token')
      }
    })

    // fetch(`${baseUrl}/auth/user`,
    //   {
    //     method: 'GET',
    //     mode: 'cors',
    //     cache: 'no-cache',
    //     credentials: 'same-origin',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       authorization: 'Bearer ' + getCookie('token')
    //     },
    //     redirect: 'follow',
    //     referrerPolicy: 'no-referrer',
    //   }
    // )
    // .then(checkResponse)
    .then(res => dispatch({
      type: GET_USER_SUCCESS,
      user: res.user,
      isAuth: true,
      isAuthChecked: true,
      // isLogout: false
      isLogoutChecked: true
    }))
    .catch(err => dispatch({
      type: GET_USER_FAILED,
      isAuth: false,
      isAuthChecked: true,
      isLogoutChecked: true
    }))
  }
};

function editUser(newUserData) {

  console.log(newUserData);
  return function(dispatch) {
    dispatch({
      type: EDIT_USER
    })

    fetchWithRefresh(`${baseUrl}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify(
        newUserData
      )
    })

    // fetch(`${baseUrl}/auth/user`,
    //   {
    //     method: 'PATCH',
    //     mode: 'cors',
    //     cache: 'no-cache',
    //     credentials: 'same-origin',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: 'Bearer ' + getCookie('token')
    //     },
    //     redirect: 'follow',
    //     referrerPolicy: 'no-referrer',
    //     body: JSON.stringify(
    //       newUserData
    //     )
    //   }
    // )
    // .then(checkResponse)
    .then(res => dispatch({
      type: EDIT_USER_SUCCESS,
      user: res.user,
    }))
    .catch(err => dispatch({
      type: EDIT_USER_FAILED,
    }))
  }
}

export {GET_USER, GET_USER_SUCCESS, GET_USER_FAILED, EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_FAILED, getUser, editUser};
