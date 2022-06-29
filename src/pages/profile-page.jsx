import React from "react";
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

import styles from './profile-page.module.css';
import formStyles from './inputs-pages.module.css';

import { Tab, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import {LoginPage, OrdersPage} from './index.jsx';

export default function ProfilePage() {

  // const [nameValue, setNameValue] = React.useState('');
  // const [loginValue, setLoginValue] = React.useState('');
  // const [passwordValue, setPasswordValue] = React.useState('');
  // const inputRef = React.useRef(null);
  // const onIconClick = () => {
  //   setTimeout(() => inputRef.current.focus(), 0)
  //   alert('Icon Click Callback')
  // };

  console.log(useParams());
  console.log(useRouteMatch());

  const { url } = useRouteMatch();
  const { path } = useRouteMatch();

  // console.log(path);

  return (
    <main className={styles.main}>
      <section className={styles.menu}>
        <nav>
          <ul className={styles.nav_list}>
            <li className={`text text_type_main-medium ${styles.nav_element}`}>
              <Link to={`${url}`}>Профиль</Link>
            </li>
            <li className={`text text_type_main-medium ${styles.nav_element}`}>
              <Link to={`${url}/orders`}>История заказов</Link>
            </li>
            <li className={`text text_type_main-medium ${styles.nav_element}`}>
              <a>Выход</a>
            </li>
          </ul>
        </nav>

        <p className={`${styles.info} text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </section>

      <Switch>
        <Route path={`${path}/orders`}>
        {/* <Route path='/test' exact={true}> */}
          <OrdersPage />
        </Route>
      </Switch>

      {/* <form className={formStyles.form} action="">
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

      </form> */}

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
