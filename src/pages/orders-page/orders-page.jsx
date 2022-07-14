import React from "react";

import styles from './orders-page.module.css';

import ProfileMenu from '../../components/profile-menu/profile-menu.jsx';


export default function OrdersPage() {
  console.log('Orders page');
  return (
    <main className={styles.main}>
      <ProfileMenu />

      <div style={{width: '480px'}}>История заказов</div>
    </main>
  )
}
