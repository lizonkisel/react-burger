import React, { useRef, useCallback, FormEvent} from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from '../services/hooks';
import {useHistory, Redirect} from 'react-router-dom';

import styles from './inputs-pages.module.css';

import {Input, Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import { register } from "../services/actions/register";

import { TEmptyFunction } from "../services/types/utils";

export default function RegisterPage() {

  const { user } = useSelector(store => store.auth);

  const [nameValue, setNameValue] = React.useState<string>('');
  const [emailValue, setEmailValue] = React.useState<string>('');
  const [passwordValue, setPasswordValue] = React.useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    // setTimeout(() => inputRef.current.focus(), 0)
    // alert('Icon Click Callback')
  };

  const dispatch = useDispatch();

  const history = useHistory();

  const login = useCallback<TEmptyFunction>(
    () => {
      history.replace({pathname: '/login'})
    }, [history]
  );

  function createUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(register(nameValue, emailValue, passwordValue));
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

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium">Регистрация</h1>

      <form className={styles.form} action="" onSubmit={createUser}>
        <fieldset className={styles.fieldset}>
          <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={e => setNameValue(e.target.value)}
              icon={'CurrencyIcon'}
              value={nameValue}
              name={'name'}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
            />
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
        {/* <Button type="primary" size="medium" onClick={createUser}> */}
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>

      <div className={styles.additional_actions}>
        <div className={styles.additional_action}>
          <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
          <Button type="secondary" size="medium" onClick={login}>
            Войти
          </Button>
        </div>
      </div>
    </main>
  )
}
