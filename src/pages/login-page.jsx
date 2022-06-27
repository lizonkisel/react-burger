// Initital commit
import React from "react";
import {Link} from 'react-router-dom';

import styles from './login-page.module.css';

import {Button} from '@ya.praktikum/react-developer-burger-ui-components';

import CustomEmailInput from '../components/inputs/custom-email-input/custom-email-input.jsx';
import CustomPasswordInput from '../components/inputs/custom-password-input/custom-password-input.jsx';

export default function LoginPage() {

  // const [mailValue, setMailValue] = React.useState('bob@example.com');
  // const onChange = e => {
  //   setValue(e.target.value)
  // };
  // const [passwordValue, setPasswordValue] = React.useState('password');

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium">Вход</h1>

      <form className={styles.form} action="">
        <fieldset className={styles.fieldset}>
          <CustomEmailInput />
          <CustomPasswordInput />
        </fieldset>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>

      <div className={styles.additional_actions}>
        <div className={styles.additional_action}>
          <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
          <Button type="secondary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles.additional_action}>
          <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
          <Button type="secondary" size="medium">
            Восстановить пароль
          </Button>
        </div>
      </div>
    </main>
  )
}
