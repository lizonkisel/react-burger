import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import appHeader from './app-header.module.css';

export default function AppHeader() {
    return (
        <header className={appHeader.header}>
            <Tab value="one">
                One
            </Tab>
            <Tab value="two">
                Two
            </Tab>
            {/* <button>
                <BurgerIcon type="primary"/>
                <span className={appHeader.buttonText}></span>
                Кнопка
            </button> */}
            <ListIcon type="secondary" />
            <Logo />
            <ProfileIcon type="secondary" />
        </header>
    )
}