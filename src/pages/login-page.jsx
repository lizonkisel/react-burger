// Initital commit
import React, { useCallback } from "react";
import {useHistory} from 'react-router-dom';

import styles from './inputs-pages.module.css';

import {Button} from '@ya.praktikum/react-developer-burger-ui-components';

import CustomEmailInput from '../components/inputs/custom-email-input/custom-email-input.jsx';
import CustomPasswordInput from '../components/inputs/custom-password-input/custom-password-input.jsx';

import { login } from "../services/actions/login";
import { useDispatch } from "react-redux";

export default function LoginPage() {

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

  const dispatch = useDispatch();

  function loginUser(e) {
    e.preventDefault();
    console.log('Dispatch login');
    dispatch(login());
  }


  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium">Вход</h1>

      <form className={styles.form} action="">
        <fieldset className={styles.fieldset}>
          <CustomEmailInput />
          <CustomPasswordInput />
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
