import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import appHeader from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={`mt-10 pb-4 pt-4 ${appHeader.header}`}>
      <nav className={appHeader.menu} >
        <div className={appHeader.menuLeftColumn}>
          <a className={`pl-5 pr-5 ${appHeader.link}`}>
            <BurgerIcon type="primary"/>
            <span className="text text_type_main-default pl-2">Конструктор</span>
          </a>
          <a className={`pl-5 pr-5 ${appHeader.link}`}>
            <ListIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive pl-2">Лента заказов</span>
          </a>
        </div>
        <div className={appHeader.logo}>
          <Logo />
        </div>
        <a className={`pl-5 pr-5 ${appHeader.link}`}>
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</span>
        </a>
      </nav>
    </header>
  )
}
