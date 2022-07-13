import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, Redirect} from 'react-router-dom';

import styles from './inputs-pages.module.css';

import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import { login } from "../services/actions/login";

export default function LoginPage() {

  const { user } = useSelector(store => store.auth);
  console.log(user);

  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const dispatch = useDispatch();

  const history = useHistory();

  const register = useCallback(
    () => {
      history.replace({pathname: '/register'});
    }, [history]
  );

  const forgotPassword = useCallback(
    () => {
      history.replace({pathname: '/forgot-password'})
    }, [history]
  );

  function loginUser(e) {
    e.preventDefault();
    console.log('Dispatch login');
    dispatch(login(emailValue, passwordValue));
    // Дальнейший код нужно исполнять только если данные введены правильно. Для этого потребуется работа со стейтом
    history.replace({pathname: '/'});
  }


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
  // const loginUser = useCallback((e) => {
  //   e.preventDefault();
  //   console.log('Dispatch login');
  //   dispatch(login(emailValue, passwordValue));
  //   // Дальнейший код нужно исполнять только если данные введены правильно. Для этого потребуется работа со стейтом
  //   history.replace({pathname: '/'});
  // });


  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium">Вход</h1>

      <form className={styles.form} action="">
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
          {/* <CustomEmailInput />
          <CustomPasswordInput /> */}
        </fieldset>
        <Button type="primary" size="medium" onClick={loginUser}>
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
