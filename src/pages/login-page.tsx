import React, { useCallback, FormEvent } from "react";
import { useDispatch, useSelector } from '../services/hooks';
import {useHistory, useLocation, Redirect} from 'react-router-dom';

import styles from './inputs-pages.module.css';

import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import { login } from "../services/actions/login";

import { TEmptyFunction } from "../services/types/utils";

export default function LoginPage() {

  const { user } = useSelector(store => store.auth);

  const [emailValue, setEmailValue] = React.useState<string>('');
  const [passwordValue, setPasswordValue] = React.useState<string>('');

  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation<{from: string}>();

  const register = useCallback<TEmptyFunction>(
    () => {
      history.replace({pathname: '/register'});
    }, [history]
  );

  const forgotPassword = useCallback<TEmptyFunction>(
    () => {
      history.replace({pathname: '/forgot-password'})
    }, [history]
  );

  function loginUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch(login(emailValue, passwordValue));
  }

  const { from } = location.state || { from: { pathname: '/' } };

  const {isLogoutChecked} = useSelector(store => store.auth);

  if (!isLogoutChecked) {
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

  if (user) {
    return (
      <Redirect
        to={from}
      />
    )
  };

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium">Вход</h1>

      <form className={styles.form} action="" onSubmit={loginUser}>
        <fieldset className={styles.fieldset}>
          <EmailInput
            onChange={e => setEmailValue(e.target.value)}
            value={emailValue}
            name={'email'}
          />
          <PasswordInput
            onChange={e => setPasswordValue(e.target.value)}
            value={passwordValue}
            name={'password'}
          />
        </fieldset>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>

      <div className={styles.additional_actions}>
        <div className={styles.additional_action}>
          <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
          <Button type="secondary" size="medium" onClick={register}>
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles.additional_action}>
          <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
          <Button type="secondary" size="medium" onClick={forgotPassword}>
            Восстановить пароль
          </Button>
        </div>
      </div>
    </main>
  )
}
