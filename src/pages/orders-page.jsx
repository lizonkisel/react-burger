import React from "react";
import {useRouteMatch} from 'react-router-dom';
import formStyles from './inputs-pages.module.css';
import styles from './profile-page.module.css';

import { Tab, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import ProfileMenu from '../components/profile-menu/profile-menu.jsx';

// import styles from './inputs-pages.module.css';

// import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

// import CustomEmailInput from '../components/inputs/custom-email-input/custom-email-input.jsx';
// import CustomPasswordInput from '../components/inputs/custom-password-input/custom-password-input.jsx';

// import {baseUrl, checkResponse} from '../utils/data.js';

export default function OrdersPage() {

  console.log('Orders page');
  return (
    <main className={styles.main}>
      <ProfileMenu />

      <div style={{width: '480px'}}>История заказов</div>
    </main>
  )
}
