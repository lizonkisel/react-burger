import { refreshToken } from "../services/actions/refreshToken";

const baseUrl = 'https://norma.nomoreparties.space/api';
const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const defaultBunUrl = "https://code.s3.yandex.net/react/code/bun-02.png";

const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// type TResponse = {
//   'type': string;
//   'url': string;
//   'redirected': boolean;
//   status: 200;
//   ok: true;
//   statusText: "OK";
//   headers: Headers;
//   body: ReadableStream;
//   bodyUsed: false;
// }

function checkResponse<T>(res: Response): Promise<T> {
  console.log(res);
  console.log(res.ok);
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// function setCookie(name, value, props) {
  function setCookie(name: string, value: string, props?: Record<string, string | number | Date | boolean>) {
    console.log(`name: ${name}`);
    console.log(`value: ${value}`);
    console.log(`props: ${props}`);
    console.log(props);
  // // props = props || {};
  // // let exp = props.expires;
  // // if (typeof exp == 'number' && exp) {
  // //   const d = new Date();
  // //   d.setTime(d.getTime() + exp * 1000);
  // //   exp = props.expires = d;
  // // }
  // // if (exp && exp.toUTCString) {
  // //   props.expires = exp.toUTCString();
  // // }
  // value = value.split(' ')[1];
  // value = encodeURIComponent(value);
  // const updatedCookie = name + '=' + value;
  // // let updatedCookie = name + '=' + value;
  // // for (const propName in props) {
  // //   updatedCookie += '; ' + propName;
  // //   const propValue = props[propName];
  // //   if (propValue !== true) {
  // //     updatedCookie += '=' + propValue;
  // //   }
  // // }
  // document.cookie = updatedCookie;

  // console.log(value);
  // if (value.indexOf('Bearer') === 0) {
  //   // Отделяем схему авторизации от "полезной нагрузки токена",
  //   // Стараемся экономить память в куках (доступно 4кб)
  //   value = value.split('Bearer ')[1];
  // }

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

function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const fetchWithRefresh = async (url: any, options: any) => {
  try {
    const res = await fetch(url, options);
    console.log(res);
    const data = await checkResponse(res);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    // @ts-ignore
    if (err.message === 'jwt expired') {
      const currentRefreshToken = localStorage.getItem('refreshToken');
      const refreshData = await refreshToken(currentRefreshToken);
      console.log(refreshData);
      // @ts-ignore
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      } else {
        // @ts-ignore
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        // @ts-ignore
        setCookie('token', refreshData.accessToken.split('Bearer ')[1]);

        const res = await fetch(url, {
          ...options,
            headers: {
              ...options.headers,
              // Authotization: 'Bearer ' + refreshData.accessToken
              // @ts-ignore
              Authotization: refreshData.accessToken
            }
        });
        const data = await checkResponse(res);
        console.log('Всё успешно');
        return data;
      }
    } else {
      return Promise.reject(err)
    }
  }
};

const statuses = {
  'done': 'Выполнен',
  'created': 'Создан',
  'pending': 'Готовится'
}


export {baseUrl, wsUrl, defaultBunUrl, regExp, checkResponse, setCookie, getCookie, fetchWithRefresh, statuses};

