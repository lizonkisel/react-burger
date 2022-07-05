import {baseUrl, checkResponse, getCookie} from '../../utils/data.js';

const GET_USER = 'GET_USER';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_FAILED = 'GET_USER_FAILED';

const EDIT_USER = 'EDIT_USER';
const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
const EDIT_USER_FAILED = 'EDIT_USER_FAILED';

function getUser() {

  return function(dispatch) {
    dispatch({
      type: GET_USER
    })

    fetch(`${baseUrl}/auth/user`,
      {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          authorization: getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      }
    )
    .then(checkResponse)
    .then(res => dispatch({
      type: GET_USER_SUCCESS,
      user: res.user,
    }))
    .catch(err => dispatch({
      type: GET_USER_FAILED,
    }))
  }
}

function editUser(email, password) {
  return function(dispatch) {
    dispatch({
      type: EDIT_USER
    })

    fetch(`${baseUrl}/auth/user`,
      {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          authorization: getCookie('token')
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
      type: EDIT_USER_SUCCESS,
      user: res.user,
    }))
    .catch(err => dispatch({
      type: EDIT_USER_FAILED,
    }))
  }
}

export {GET_USER, GET_USER_SUCCESS, GET_USER_FAILED, EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_FAILED, getUser, editUser};
