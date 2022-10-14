import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from '../../services/hooks';

import styles from './orders-page.module.css';

import ProfileMenu from '../../components/profile-menu/profile-menu';
import { OrderCard } from "../../components/order-card/order-card";
import { WS_CONNECTION_CLOSED } from "../../services/constants/wsActionTypes";
import { wsActions } from "../../services/constants/wsActionTypes";
import { wsInitWithTokenAction, wsCloseAction } from "../../services/actions/wsActions";
import { getCookie } from "../../utils/utils";


export default function OrdersPage() {

  const dispatch = useDispatch();

  const accessToken = getCookie('token');
  console.log(accessToken);

  const { orders, wsConnected, total, totalToday} = useSelector(store => store.ws);

  useEffect(() => {
    dispatch(wsInitWithTokenAction(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));
    return () => {
      dispatch(wsCloseAction());
    };
  }, [dispatch, accessToken]);
// }, []);

  console.log('Orders page');

  if (!orders) {
    return <p className="text text_type_main-medium">Загружаем данные...</p>
  }

  return (
    <main className={styles.main}>
      <ProfileMenu />
      <section className={styles.order_feed}>
        {orders.map((order) => {
          return (
            <OrderCard order={order}>

            </OrderCard>
          )
        })}
      </section>
    </main>
  )
};
