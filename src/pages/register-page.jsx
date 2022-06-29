import React, { useCallback } from "react";
import {useHistory} from 'react-router-dom';

import styles from './inputs-pages.module.css';

import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import CustomEmailInput from '../components/inputs/custom-email-input/custom-email-input.jsx';
import CustomPasswordInput from '../components/inputs/custom-password-input/custom-password-input.jsx';

import {baseUrl, checkResponse} from '../utils/data.js';

export default function RegisterPage() {

    const [value, setValue] = React.useState('')
    const inputRef = React.useRef(null)
    const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
      alert('Icon Click Callback')
    };

    const history = useHistory();
    console.log(history);

    const login = useCallback(
      () => {
        history.replace({pathname: '/login'})
      }, [history]
    );

    function createUser(e) {
      e.preventDefault();
      fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          "email": "lizonkisel5934@mail.ru",
          "password": "test/1998",
          "name": "test"
        })
      })
      .then(checkResponse)
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err))
    }


  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium">Регистрация</h1>

      <form className={styles.form} action="">
        <fieldset className={styles.fieldset}>
          <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={e => setValue(e.target.value)}
              icon={'CurrencyIcon'}
              value={value}
              name={'name'}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
            />
          <CustomEmailInput />
          <CustomPasswordInput />
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
