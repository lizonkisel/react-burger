import {baseUrl, checkResponse} from '../../utils/utils';
import { AppDispatch, AppThunk } from '../types';

import {RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED,
  RECOVER_PASSWORD, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_FAILED} from '../constants/index';

// const RECOVER_PASSWORD = 'RECOVER_PASSWORD';
// const RECOVER_PASSWORD_SUCCESS = 'RECOVER_PASSWORD_SUCCESS';
// const RECOVER_PASSWORD_FAILED = 'RECOVER_PASSWORD_FAILED';

// const RESET_PASSWORD = 'RESET_PASSWORD';
// const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
// const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

interface IRecoverPasswordAction {
  readonly type: typeof RECOVER_PASSWORD
}

interface IRecoverPasswordSuccessAction {
  readonly type: typeof RECOVER_PASSWORD_SUCCESS
}

interface IRecoverPasswordFailedAction {
  readonly type: typeof RECOVER_PASSWORD_FAILED
}

interface IResetPasswordAction {
  readonly type: typeof RESET_PASSWORD
}

interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS
}

interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED
}

export type TPasswordActions =
  IRecoverPasswordAction |
  IRecoverPasswordSuccessAction |
  IRecoverPasswordFailedAction |
  IResetPasswordAction |
  IResetPasswordSuccessAction |
  IResetPasswordFailedAction
;

function recoverPasswordAction(): IRecoverPasswordAction {
  return {
    type: RECOVER_PASSWORD,
  }
};

function recoverPasswordSuccessAction(): IRecoverPasswordSuccessAction {
  return {
    type: RECOVER_PASSWORD_SUCCESS,
  }
};

function recoverPasswordFailedAction(): IRecoverPasswordFailedAction {
  return {
    type: RECOVER_PASSWORD_FAILED,
  }
};

function resetPasswordAction(): IResetPasswordAction {
  return {
    type: RESET_PASSWORD,
  }
};

function resetPasswordSuccessAction(): IResetPasswordSuccessAction {
  return {
    type: RESET_PASSWORD_SUCCESS,
  }
};

function resetPasswordFailedAction(): IResetPasswordFailedAction {
  return {
    type: RESET_PASSWORD_FAILED,
  }
};


// function recoverPassword(email) {
const recoverPassword: AppThunk = (email: string) => {
  return function(dispatch: AppDispatch) {
    // dispatch({
    //   type: RECOVER_PASSWORD,
    // })
    dispatch(recoverPasswordAction())

    fetch(`${baseUrl}/password-reset`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          "email": email
        })
      }
    )
    .then(checkResponse)
    .then(res =>
      // dispatch({
      //   type: RECOVER_PASSWORD_SUCCESS,
      // })
      dispatch(recoverPasswordSuccessAction())
    )
    .catch(err =>
      // dispatch({
      //   type: RECOVER_PASSWORD_FAILED,
      // })
      dispatch(recoverPasswordFailedAction())
    )
  }
};

// function resetPassword (newPassword, emailToken) {
const resetPassword: AppThunk = (newPassword: string, emailToken: string) => {
  return function(dispatch: AppDispatch) {
    // dispatch({
    //   type: RESET_PASSWORD,
    // })
    dispatch(resetPasswordAction())

    fetch(`${baseUrl}/password-reset/reset`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          "password": newPassword,
          "token": emailToken
        })
      }
    )
    .then(checkResponse)
    .then(res =>
      // dispatch({
      //   type: RESET_PASSWORD_SUCCESS
      // })
      dispatch(resetPasswordSuccessAction())
    )
    .catch(err =>
      // dispatch({
      //   type: RESET_PASSWORD_FAILED
      // })
      dispatch(resetPasswordFailedAction())
    )
  }
}

// export {RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, RECOVER_PASSWORD, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_FAILED, recoverPassword, resetPassword};
export {recoverPassword, resetPassword};
