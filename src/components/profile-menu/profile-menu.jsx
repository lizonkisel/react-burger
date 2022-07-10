import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, Route, Switch, useParams, useRouteMatch, useHistory } from 'react-router-dom';

import styles from './profile-menu.module.css';

import { logout } from "../../services/actions/logout";
import { setCookie } from "../../utils/utils";

export default function ProfileMenu() {

  const history = useHistory();

  const dispatch = useDispatch();

  const logoutFromAccount = async () => {
    console.log('Exit click');
    await dispatch(logout());

    setCookie('token', null, { expires: -1 });

    history.replace({pathname: '/login'});

  };

  return (
    <section className={styles.menu}>
      <nav>
        <ul className={styles.nav_list}>
          <li className={`${styles.nav_element}`}>
            <NavLink to={'/profile'} className={`text text_type_main-medium ${styles.nav_link}`} activeClassName={styles.active_nav_link}>Профиль</NavLink>
          </li>
          <li className={`${styles.nav_element}`}>
            <NavLink to={'/profile/orders'} className={`text text_type_main-medium ${styles.nav_link}`} activeClassName={styles.active_nav_link}>История заказов</NavLink>
          </li>
          <li className={`${styles.nav_element}`}>
            <button className={`text text_type_main-medium ${styles.nav_button}`} onClick={logoutFromAccount}>Выход</button>
          </li>
        </ul>
      </nav>

      <p className={`${styles.info} text text_type_main-default text_color_inactive`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </section>
  )
}
