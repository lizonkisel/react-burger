import React, { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from '../../services/hooks';

import styles from './orders-page.module.css';

import ProfileMenu from '../../components/profile-menu/profile-menu';
import { OrderCard } from "../../components/order-card/order-card";
import { WS_CONNECTION_CLOSED } from "../../services/constants/wsActionTypes";
import { wsActions } from "../../services/constants/wsActionTypes";
import { wsInitWithTokenAction, wsCloseAction } from "../../services/actions/wsActions";
import { wsBaseUrl, getCookie } from "../../utils/utils";


export default function OrdersPage() {

  const dispatch = useDispatch();

  const accessToken = getCookie('token');

  const { orders, wsConnected, total, totalToday} = useSelector(store => store.ws);

  useEffect(() => {
    dispatch(wsInitWithTokenAction(`${wsBaseUrl}/orders?token=${accessToken}`));
    return () => {
      dispatch(wsCloseAction());
    };
  }, [dispatch, accessToken]);

  if (!orders) {
    return <p className="text text_type_main-medium">Загружаем данные...</p>
  }

  return (
    <main className={styles.main}>
      <ProfileMenu />
      <section className={styles.order_feed}>
        {orders.map((order) => {
          return (
            <OrderCard key={uuidv4()} order={order}>

            </OrderCard>
          )
        })}
      </section>
    </main>
  )
};
