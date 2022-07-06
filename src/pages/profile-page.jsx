import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

import styles from './profile-page.module.css';
import formStyles from './inputs-pages.module.css';

import { Tab, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import {LoginPage, OrdersPage} from './index.jsx';

import ProfileMenu from '../components/profile-menu/profile-menu.jsx';

export default function ProfilePage() {

  // const [nameValue, setNameValue] = React.useState('');
  // const [loginValue, setLoginValue] = React.useState('');
  // const [passwordValue, setPasswordValue] = React.useState('');
  // const inputRef = React.useRef(null);
  // const onIconClick = () => {
  //   setTimeout(() => inputRef.current.focus(), 0)
  //   alert('Icon Click Callback')
  // };

  const [nameValue, setNameValue] = React.useState('');
  const [loginValue, setLoginValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setIsButtonsVisible(true);
    // setTimeout(() => inputRef.current.focus(), 0)
    // alert('Icon Click Callback')
  };

  console.log(useParams());
  console.log(useRouteMatch());

  const { url } = useRouteMatch();
  const { path } = useRouteMatch();

  const [isButtonsVisible, setIsButtonsVisible] = useState(false);

  // useEffect(() => {
  //   if (isButtonsVisible) {

  //   }
  // }, [isButtonsVisible])

  return (
    <main className={styles.main}>
      <ProfileMenu />

      {/* <section className={styles.menu}>
        <nav>
          <ul className={styles.nav_list}>
            <li className={`text text_type_main-medium ${styles.nav_element}`}>
              <Link to={`${url}`}>Профиль</Link>
            </li>
            <li className={`text text_type_main-medium ${styles.nav_element}`}>
              <Link to={`${url}/orders`}>История заказов</Link>
            </li>
            <li className={`text text_type_main-medium ${styles.nav_element}`}>
              <Link to={'/'}>Выход</Link>
            </li>
          </ul>
        </nav>

        <p className={`${styles.info} text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </section> */}

      {/* <Switch>
        <Route path={`${path}/orders`}>
          <OrdersPage />
        </Route>
      </Switch> */}

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
        <div className={`${styles.buttons_wrapper} ${isButtonsVisible ? styles.buttons_wrapper_visible : null}`}>
          <Button type="secondary" size="medium">
            Отмена
          </Button>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>

      {/* <div className={styles.additional_actions}>
        <div className={styles.additional_action}>
          <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
          <Button type="secondary" size="medium" onClick={login}>
            Войти
          </Button>
        </div>
      </div> */}
    </main>
  )
}
