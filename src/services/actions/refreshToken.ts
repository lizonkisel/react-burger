import {baseUrl, checkResponse} from '../../utils/utils';
import {REFRESH_TOKEN, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED} from '../constants/index';


const refreshToken = (refreshToken: string | null) => {
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
        "token": refreshToken
      })
    }
  )
  .then(checkResponse)
};

export {refreshToken};
