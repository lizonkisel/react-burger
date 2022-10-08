import {baseUrl, checkResponse} from '../../utils/utils.ts';
import {REFRESH_TOKEN, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED} from '../constants/index.ts';

// const REFRESH_TOKEN = 'REFRESH_TOKEN';
// const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
// const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

const refreshToken = (refreshToken) => {
  console.log(localStorage.getItem('refreshToken'));
  return fetch(`${baseUrl}/auth/token`,
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
        // "token": `{{${localStorage.getItem('refreshToken')}}}`
        "token": refreshToken
      })
    }
  )
  .then(checkResponse)
};

// export {REFRESH_TOKEN, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED, refreshToken};
export {refreshToken};
