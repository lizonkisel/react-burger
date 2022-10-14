import React, { useRef, useCallback, FormEvent} from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from '../services/hooks';
import {useHistory, Redirect, useLocation} from 'react-router-dom';

import styles from './inputs-pages.module.css';

import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';

import { resetPassword } from "../services/actions/password";

import { TEmptyFunction } from "../services/types/utils";

export default function ResetPasswordPage() {

  const { user } = useSelector(store => store.auth);
  console.log(user);

  const [newPasswordValue, setNewPasswordValue] = React.useState<string>('');
  const [codeValue, setCodeValue] = React.useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    // setTimeout(() => inputRef.current.focus(), 0)
    // alert('Icon Click Callback')
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<{from: {pathname: string}}>();

  const { from } = location.state || { from: { pathname: '/' } };

  if (from.pathname !== '/forgot-password') {
    console.log('Redirect');
    return (
      <Redirect
        to={from}
      />
    )
  };

  const login = useCallback<TEmptyFunction>(
    () => {
      history.replace({pathname: '/login'})
    }, [history]
  );

  function changePassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    (async () => {
      await dispatch(resetPassword(newPasswordValue, codeValue));
      console.log('test 2');
      history.replace({pathname: '/profile'});
    })();
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

      <form className={styles.form} action="" onSubmit={changePassword}>
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
        {/* <Button type="primary" size="medium" onClick={changePassword}> */}
        <Button type="primary" size="medium">
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
