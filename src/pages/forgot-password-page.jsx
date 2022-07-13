import React, { useCallback } from "react";
import {useHistory, Redirect} from 'react-router-dom';

import styles from './inputs-pages.module.css';

import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';

import {baseUrl, checkResponse} from '../utils/utils.js';

import { recoverPassword } from "../services/actions/password";
import { useDispatch, useSelector } from "react-redux";

export default function ForgotPasswordPage() {

  const { user } = useSelector(store => store.auth);
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    // setTimeout(() => inputRef.current.focus(), 0)
    // alert('Icon Click Callback')
  };

  const history = useHistory();
  const dispatch = useDispatch();

  const login = useCallback(
    () => {
      history.replace({pathname: '/login'})
    }, [history]
  );

  function recover(e) {
    e.preventDefault();
    (async () => {
      await dispatch(recoverPassword(value));
      console.log('test');
      history.replace({pathname: '/reset-password'})
    })();


    // fetch(`${baseUrl}/password-reset`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8'
    //   },
    //   body: JSON.stringify({
    //     "email": value
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
          {/* <CustomEmailInput /> */}
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={e => setValue(e.target.value)}
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
        <Button type="primary" size="medium" onClick={recover}>
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
