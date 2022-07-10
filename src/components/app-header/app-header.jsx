import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import appHeader from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {

  // const [isActive, setIsActive] = useState(true);
  const {pathname} = useLocation();
  console.log(pathname);

  return (
    <header className={`mt-10 ${appHeader.header}`}>
      <nav className={`pb-4 pt-4 ${appHeader.menu}`} >
        <div className={appHeader.menuLeftColumn}>
          <NavLink to='/' exact={true} className={`text text_type_main-default pl-5 pr-5 pt-4 pb-4 ${appHeader.link}`} activeClassName={appHeader.active_nav_link}>
            <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
            <span className="pl-2">Конструктор</span>
          </NavLink>
          <NavLink to='/orders-history' exact={true} className={`text text_type_main-default pl-5 pr-5 pt-4 pb-4 ${appHeader.link}`} activeClassName={appHeader.active_nav_link}>
            <ListIcon type={pathname === '/orders-history' ? 'primary' : 'secondary'}/>
            <span className="pl-2">Лента заказов</span>
          </NavLink>
        </div>
        <NavLink to='/profile' className={`text text_type_main-default pl-5 pr-5 pt-4 pb-4 ${appHeader.link}`} activeClassName={appHeader.active_nav_link}>
          <ProfileIcon type={(pathname === '/profile' || '/profile/orders') ? 'primary' : 'secondary'} />
          <span className="pl-2">Личный кабинет</span>
        </NavLink>
      </nav>
      <div className={appHeader.logo}>
        <Logo />
      </div>
    </header>
  )
}
