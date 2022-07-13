import React, { useCallback} from "react";
import {useHistory, Redirect} from 'react-router-dom';

import styles from './inputs-pages.module.css';

import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';

import {baseUrl, checkResponse} from '../utils/utils.js';

import { resetPassword } from "../services/actions/password";
import { useDispatch, useSelector } from "react-redux";

export default function ResetPasswordPage() {

  const { user } = useSelector(store => store.auth);
  console.log(user);

  const [newPasswordValue, setNewPasswordValue] = React.useState('');
  const [codeValue, setCodeValue] = React.useState('');

  const inputRef = React.useRef(null);
  const onIconClick = () => {
    // setTimeout(() => inputRef.current.focus(), 0)
    // alert('Icon Click Callback')
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const login = useCallback(
    () => {
      history.replace({pathname: '/login'})
    }, [history]
  );

  function changePassword(e) {
    e.preventDefault();

    (async () => {
      await dispatch(resetPassword(newPasswordValue, codeValue));
      console.log('test 2');
      history.replace({pathname: '/profile'});
    })();

    // fetch(`${baseUrl}/password-reset/reset`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8'
    //   },
    //   body: JSON.stringify({
    //     "password": newPasswordValue,
    //     "token": codeValue
    //   })
    // })
    // .then(checkResponse)
    // .then(data => {
    //   console.log(data);
    //   history.replace({pathname: '/reset-password'})
    // })
    // .catch(err => console.log(err))
  };

  if (user) {
    console.log('Redirect');
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  };

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>

      <form className={styles.form} action="">
        <fieldset className={styles.fieldset}>
          <Input
            type={'password'}
            placeholder={'Введите новый пароль'}
            onChange={e => setNewPasswordValue(e.target.value)}
            icon={'ShowIcon'}
            value={newPasswordValue}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={e => setCodeValue(e.target.value)}
            icon={'EditIcon'}
            value={codeValue}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </fieldset>
        <Button type="primary" size="medium" onClick={changePassword}>
          Сохранить
        </Button>
      </form>

      <div className={styles.additional_actions}>
        <div className={styles.additional_action}>
          <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
          <Button type="secondary" size="medium" onClick={login}>
            Войти
          </Button>
        </div>
      </div>
    </main>
  )
};
