import React, { useCallback} from "react";
import { useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';

import styles from './inputs-pages.module.css';

import {Input, Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import { register } from "../services/actions/register";

export default function RegisterPage() {

    const [nameValue, setNameValue] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');

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

    function createUser(e) {
      e.preventDefault();
      dispatch(register(nameValue, emailValue, passwordValue));
    }


  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium">Регистрация</h1>

      <form className={styles.form} action="">
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
        <Button type="primary" size="medium" onClick={createUser}>
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
