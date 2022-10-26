import React from "react";
import { useDispatch } from '../../services/hooks';
import { NavLink, useHistory } from 'react-router-dom';

import styles from './profile-menu.module.css';

import { logout } from "../../services/actions/logout";
import { setCookie, getCookie } from "../../utils/utils";

export default function ProfileMenu() {

  const history = useHistory();

  const dispatch = useDispatch();

  const signOut = async () => {
    await dispatch(logout());
  };

  const logoutFromAccount = () => {
    signOut().then(() => {
      setCookie('token', '', { expires: -1 });
      history.replace({ pathname: '/login' });
    });
  };

  return (
    <section className={styles.menu}>
      <nav>
        <ul className={styles.nav_list}>
          <li className={`${styles.nav_element}`}>
            <NavLink to={'/profile'} exact={true} className={`text text_type_main-medium ${styles.nav_link}`} activeClassName={styles.active_nav_link}>Профиль</NavLink>
          </li>
          <li className={`${styles.nav_element}`}>
            <NavLink to={'/profile/orders'} exact={true} className={`text text_type_main-medium ${styles.nav_link}`} activeClassName={styles.active_nav_link}>История заказов</NavLink>
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
