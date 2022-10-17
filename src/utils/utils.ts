import { refreshToken } from "../services/actions/refreshToken";
import { TUser } from "../services/types/server-data";

const baseUrl: string = 'https://norma.nomoreparties.space/api';
const wsBaseUrl: string = 'wss://norma.nomoreparties.space';
const wsUrl: string = 'wss://norma.nomoreparties.space/orders/all';
const defaultBunUrl: string = "https://code.s3.yandex.net/react/code/bun-02.png";

const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkResponse<T>(res: Response): Promise<T> {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function setCookie(name: string, value: string, props?: Record<string, string | number | Date | boolean>): void {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp instanceof Date && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};

function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};


const fetchWithRefresh = async (url: string, options: RequestInit = {}): Promise<{success: true; user: TUser}> => {
  try {
    const res: Response = await fetch(url, options);
    const data: {success: true; user: TUser} = await checkResponse(res);
    return data;
  } catch (error) {
    const err = error as Response;
    const errorData = await err.json();
    if (errorData.message === 'jwt expired') {
      const currentRefreshToken = localStorage.getItem('refreshToken');
      const newData: any = await refreshToken(currentRefreshToken);
      const refreshData = await newData.json();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      } else {
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        setCookie('token', refreshData.accessToken.split('Bearer ')[1]);
        const res = await fetch(url, {
          ...options,
            headers: {
              ...options.headers,
              Authotization: refreshData.accessToken
            }
        });
        const data: {success: true; user: TUser} = await checkResponse(res);
        return data;
      }
    } else {
      return Promise.reject(err)
    }
  }
};

const statuses: {
  [key: string]: string
} = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'Готовится'
}


export {baseUrl, wsBaseUrl, wsUrl, defaultBunUrl, regExp, checkResponse, setCookie, getCookie, fetchWithRefresh, statuses};

