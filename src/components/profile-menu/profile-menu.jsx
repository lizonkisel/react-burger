import React from "react";
import { Link, NavLink, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

import styles from './profile-menu.module.css';

export default function ProfileMenu() {

  const { url } = useRouteMatch();
  const { path } = useRouteMatch();


  return (
    <section className={styles.menu}>
      <nav>
        <ul className={styles.nav_list}>
          <li className={`text text_type_main-medium ${styles.nav_element}`}>
            <NavLink to={'/profile'} className={styles.nav_link} activeClassName={styles.active_nav_link}>Профиль</NavLink>
          </li>
          <li className={`text text_type_main-medium ${styles.nav_element}`}>
            <NavLink to={`${url}/orders`} className={styles.nav_link} activeClassName={styles.active_nav_link}>История заказов</NavLink>
          </li>
          <li className={`text text_type_main-medium ${styles.nav_element}`}>
            <Link to={'/'} className={styles.nav_link}>Выход</Link>
          </li>
        </ul>
      </nav>

      <p className={`${styles.info} text text_type_main-default text_color_inactive`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </section>
  )
}
