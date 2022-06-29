import React from "react";
import {useRouteMatch} from 'react-router-dom';
import formStyles from './inputs-pages.module.css';

import { Tab, Input } from "@ya.praktikum/react-developer-burger-ui-components";


// import styles from './inputs-pages.module.css';

// import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

// import CustomEmailInput from '../components/inputs/custom-email-input/custom-email-input.jsx';
// import CustomPasswordInput from '../components/inputs/custom-password-input/custom-password-input.jsx';

// import {baseUrl, checkResponse} from '../utils/data.js';

export default function OrdersPage() {

  const [nameValue, setNameValue] = React.useState('');
  const [loginValue, setLoginValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  };

  console.log('Orders page');
  console.log(useRouteMatch());
  return (
    <form className={formStyles.form} action="">
            <fieldset className={formStyles.fieldset}>
              <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setNameValue(e.target.value)}
                icon={'EditIcon'}
                value={nameValue}
                name={'name'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
              />
              <Input
                type={'text'}
                placeholder={'Логин'}
                onChange={e => setLoginValue(e.target.value)}
                icon={'EditIcon'}
                value={loginValue}
                name={'name'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
              />
              <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={e => setPasswordValue(e.target.value)}
                icon={'EditIcon'}
                value={passwordValue}
                name={'name'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
              />
            </fieldset>
          {/* <Button type="primary" size="medium" onClick={recover}>
            Восстановить
          </Button> */}
    </form>
  )
}
