import {baseUrl, getCookie, fetchWithRefresh} from '../../utils/utils';
import { AppDispatch, AppThunk } from '../types';

import {GET_USER, GET_USER_SUCCESS, GET_USER_FAILED, EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_FAILED} from '../constants/index';
import { TUser } from '../types/server-data';

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

function getUserSuccessAction(res: {success: true; user: TUser}): IGetUserSuccessAction {
  return {
    type: GET_USER_SUCCESS,
    user: res.user,
    isAuth: true,
    isAuthChecked: true,
    isLogoutChecked: true
  }
};

function getUserFailedAction(): IGetUserFailedAction {
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


const getUser: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch(getUserAction())

    fetchWithRefresh(`${baseUrl}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      }
    })
    .then(res =>
      dispatch(getUserSuccessAction(res))
    )
    .catch(err =>
      dispatch(getUserFailedAction())
    )
  }
};

const editUser : AppThunk = (newUserData: {name: string; email: string; password: string}) => {
  return function(dispatch: AppDispatch) {
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
      dispatch(editUserSuccessAction(res))
    )
    .catch(err =>
      dispatch(editUserFailedAction())
    )
  }
}

export {getUser, editUser};
