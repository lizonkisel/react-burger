import { refreshToken } from "../services/actions/refreshToken";

const baseUrl = 'https://norma.nomoreparties.space/api';
const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkResponse(res) {
  console.log(res);
  console.log(res.ok);
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// function setCookie(name, value, props) {
  function setCookie(name, value, props) {
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
  if (exp && exp.toUTCString) {
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

function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    console.log(res);
    const data = await checkResponse(res);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    if (err.message === 'jwt expired') {
      const currentRefreshToken = localStorage.getItem('refreshToken');
      const refreshData = await refreshToken(currentRefreshToken);
      console.log(refreshData);
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      } else {
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        setCookie('token', refreshData.accessToken.split('Bearer ')[1]);

        const res = await fetch(url, {
          ...options,
            headers: {
              ...options.headers,
              Authotization: 'Bearer ' + refreshData.accessToken
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


export {baseUrl, wsUrl, regExp, checkResponse, setCookie, getCookie, fetchWithRefresh};

