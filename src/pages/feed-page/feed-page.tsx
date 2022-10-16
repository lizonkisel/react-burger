import React, { useEffect, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from '../../services/hooks';

import styles from './feed-page.module.css';

import { OrderCard } from "../../components/order-card/order-card";
import { OrdersList } from "../../components/orders-list/orders-list";

import { WS_CONNECTION_START, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_RESET_ERROR } from "../../services/constants/wsActionTypes";

import { TEmptyFunction } from "../../services/types/utils";

export default function FeedPage() {

  const dispatch = useDispatch();
  const { orders, wsConnected, total, totalToday, error} = useSelector(store => store.ws);

  const resetError = useCallback<TEmptyFunction>(() => {
    dispatch({type: WS_CONNECTION_ERROR});
  }, [dispatch]);

  useEffect(() => {
    dispatch({type: WS_CONNECTION_START});
    return () => {
      dispatch({type: WS_CONNECTION_CLOSED});
    };
  }, [dispatch]);

  if (error) {
    dispatch({type: WS_RESET_ERROR});
  };

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
                <OrderCard key={uuidv4()} order={order}>

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
