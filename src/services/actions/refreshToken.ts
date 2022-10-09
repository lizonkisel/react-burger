import {baseUrl, checkResponse} from '../../utils/utils';
import {REFRESH_TOKEN, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED} from '../constants/index';

// const REFRESH_TOKEN = 'REFRESH_TOKEN';
// const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
// const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';



const refreshToken = (refreshToken: string | null) => {
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
