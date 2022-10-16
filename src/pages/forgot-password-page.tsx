import React, { useState, useRef, useCallback, FormEvent } from "react";
import { useDispatch, useSelector } from '../services/hooks';
import {useHistory, Redirect, useLocation} from 'react-router-dom';

import styles from './inputs-pages.module.css';

import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';

import {regExp} from '../utils/utils';

import { recoverPassword } from "../services/actions/password";
import { TEmptyFunction } from "../services/types/utils";

export default function ForgotPasswordPage() {

  const { user } = useSelector(store => store.auth);
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => {
  };

  const [cantResetPassword, setCantResetPassword] = useState(true);

  function validateEmail() {
    if (regExp.test(value)) {
      setCantResetPassword(false)
    } else {
      setCantResetPassword(true)
    }
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation<string>();

  const login = useCallback<TEmptyFunction>(
    () => {
      history.replace({pathname: '/login'})
    }, [history]
  );

  function recover(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    (async () => {
      await dispatch(recoverPassword(value));
      history.replace({pathname: '/reset-password', state: { from: location }})
    })();
  };

  if (user) {
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

      <form className={styles.form} action="" onSubmit={recover}>
        <fieldset className={styles.fieldset}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={e => {setValue(e.target.value); validateEmail()}}
            icon={'EditIcon'}
            value={value}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </fieldset>
        <Button type="primary" size="medium" disabled={cantResetPassword}>
          Восстановить
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
}
