import {baseUrl, checkResponse} from '../../utils/utils.js';

const RECOVER_PASSWORD = 'RECOVER_PASSWORD';
const RECOVER_PASSWORD_SUCCESS = 'RECOVER_PASSWORD_SUCCESS';
const RECOVER_PASSWORD_FAILED = 'RECOVER_PASSWORD_FAILED';

const RESET_PASSWORD = 'RESET_PASSWORD';
const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';


function recoverPassword(email) {

  console.log('Recover password');
  return function(dispatch) {
    dispatch({
      type: RECOVER_PASSWORD,
    })

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
    .then(res => dispatch({
      type: RECOVER_PASSWORD_SUCCESS,
    }))
    .catch(err => dispatch({
      type: RECOVER_PASSWORD_FAILED,
    }))
  }
};

function resetPassword(newPassword, emailToken) {

  return function(dispatch) {
    dispatch({
      type: RESET_PASSWORD,
    })

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
    .then(res => dispatch({
      type: RESET_PASSWORD_SUCCESS
    }))
    .catch(err => dispatch({
      type: RESET_PASSWORD_FAILED
    }))
  }
}

export {RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, RECOVER_PASSWORD, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_FAILED, recoverPassword, resetPassword};
