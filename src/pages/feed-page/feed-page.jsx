import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from './feed-page.module.css';

import OrderCard from "../../components/order-card/order-card";
import OrdersList from "../../components/orders-list/orders-list";

import { WS_CONNECTION_START } from "../../services/actions/wsActionTypes";

export default function FeedPage() {

  const dispatch = useDispatch();
  const { orders, wsConnected, total, totalToday} = useSelector(store => store.ws);

  useEffect(() => {
    dispatch({type: WS_CONNECTION_START})
  }, []);

  // if (!wsConnected) {
  //   return ( <p className="text text_type_main-medium">Загружаем данные...</p>
  //   )
  // };

  // const messagesObj = messages[0];
  // const orders = messagesObj.orders;
  // const orders = messages["orders"];

  // console.log(orders);

  // console.log(messages);
  // console.log(messages[0]);
  // console.log(messages.total);

  // const orders = [];

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Лента заказов</h1>
      {
        !wsConnected && <p className="text text_type_main-medium">Загружаем данные...</p>
      }
      {
        wsConnected && orders &&
        <div className={styles.columns}>
          <section className={styles.order_feed}>
            {orders.map((order) => {
              return (
                <OrderCard order={order}>

                </OrderCard>
              )
            })}
          </section>
          <section className={styles.orders_info}>
            <div className={styles.status}>
              <div className={styles.status_ready}>
                <p className="text text_type_main-medium">Готовы:</p>
                <OrdersList status={'done'}></OrdersList>
              </div>
              <div className={styles.status_in_progress}>
                <p className="text text_type_main-medium">В работе:</p>
                <OrdersList></OrdersList>
              </div>
            </div>
            <div className={styles.complete_all}>
              <p className="text text_type_main-medium">Выполнено за всё время:</p>
              <span className="text text_type_digits-large">{total}</span>
            </div>
            <div className={styles.complete_today}>
              <p className="text text_type_main-medium">Выполнено за сегодня:</p>
              <span className="text text_type_digits-large">{totalToday}</span>
            </div>
          </section>
        </div>
      }
    </main>
  )
}
