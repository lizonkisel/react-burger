import {baseUrl, getCookie, fetchWithRefresh} from '../../utils/utils';
import { AppDispatch, AppThunk } from '../types';

import {GET_USER, GET_USER_SUCCESS, GET_USER_FAILED, EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_FAILED} from '../constants/index';
import { TUser } from '../types/server-data';

console.log(getCookie('token'));

// const GET_USER = 'GET_USER';
// const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
// const GET_USER_FAILED = 'GET_USER_FAILED';

// const EDIT_USER = 'EDIT_USER';
// const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
// const EDIT_USER_FAILED = 'EDIT_USER_FAILED';

interface IGetUserAction {
  readonly type: typeof GET_USER,
  readonly isAuth: false,
  readonly isAuthChecked: false
}

interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS,
  readonly user: TUser,
  readonly isAuth: true,
  readonly isAuthChecked: true,
  readonly isLogoutChecked: true
}

interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED,
  readonly isAuth: false,
  readonly isAuthChecked: true,
  readonly isLogoutChecked: true
}

interface IEditUserAction {
  readonly type: typeof EDIT_USER
}

interface IEditUserSuccessAction {
  readonly type: typeof EDIT_USER_SUCCESS,
  readonly user: TUser
}

interface IEditUserFailedAction {
  readonly type: typeof EDIT_USER_FAILED
}

export type TUserActions =
  IGetUserAction |
  IGetUserSuccessAction |
  IGetUserFailedAction |
  IEditUserAction |
  IEditUserSuccessAction |
  IEditUserFailedAction
;

function getUserAction(): IGetUserAction {
  return {
    type: GET_USER,
    isAuth: false,
    isAuthChecked: false
  }
};

// Убрать any
// function getUserSuccessAction(res: {success: true; user: TUser}): IGetUserSuccessAction {
  function getUserSuccessAction(res: {success: true; user: TUser}): IGetUserSuccessAction {
  console.log('azaza success');
  console.log(res);
  return {
    type: GET_USER_SUCCESS,
    user: res.user,
    isAuth: true,
    isAuthChecked: true,
    isLogoutChecked: true
  }
};

function getUserFailedAction(err: any): IGetUserFailedAction {
  console.log('azaza failed');
  console.log(err);
  return {
    type: GET_USER_FAILED,
    isAuth: false,
    isAuthChecked: true,
    isLogoutChecked: true
  }
};

function editUserAction(): IEditUserAction {
  return {
    type: EDIT_USER
  }
};

// Убрать any
function editUserSuccessAction(res: {success: true; user: TUser}): IEditUserSuccessAction {
  return {
    type: EDIT_USER_SUCCESS,
    user: res.user
  }
};

function editUserFailedAction(): IEditUserFailedAction {
  return {
    type: EDIT_USER_FAILED
  }
};


// function getUser() {
const getUser: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    // dispatch({
    //   type: GET_USER,
    //   isAuth: false,
    //   isAuthChecked: false
    // })
    dispatch(getUserAction())

    // fetchWithRefresh(`${baseUrl}/auth/user`, {
    fetchWithRefresh(`${baseUrl}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
        // Authorization: 'Bearer ' + getCookie('token') + "dfhjfj"
        // Authorization: getCookie('token')
      }
    })
    .then(res =>
      // dispatch({
      //   type: GET_USER_SUCCESS,
      //   user: res.user,
      //   isAuth: true,
      //   isAuthChecked: true,
      //   // isLogout: false
      //   isLogoutChecked: true
      // })
      dispatch(getUserSuccessAction(res))
    )
    .catch(err =>
      // dispatch({
      //   type: GET_USER_FAILED,
      //   isAuth: false,
      //   isAuthChecked: true,
      //   isLogoutChecked: true
      // })
      dispatch(getUserFailedAction(err))
    )
  }
};

// function editUser(newUserData) {
const editUser : AppThunk = (newUserData: {name: string; email: string; password: string}) => {
  console.log(newUserData);
  return function(dispatch: AppDispatch) {
    // dispatch({
    //   type: EDIT_USER
    // })
    dispatch(editUserAction())

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
    .then(res =>
      // dispatch({
      //   type: EDIT_USER_SUCCESS,
      //   user: res.user,
      // })
      dispatch(editUserSuccessAction(res))
    )
    .catch(err =>
      // dispatch({
      //   type: EDIT_USER_FAILED
      // })
      dispatch(editUserFailedAction())
    )
  }
}

// export {GET_USER, GET_USER_SUCCESS, GET_USER_FAILED, EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_FAILED, getUser, editUser};
export {getUser, editUser};
