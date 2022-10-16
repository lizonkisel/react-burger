import React, { FunctionComponent } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from '../../services/hooks';

import styles from './orders-list.module.css';

interface IOrderListProps {
  status?: string
}

export const OrdersList: FunctionComponent<IOrderListProps> = ({status}) => {

  const {orders} = useSelector(store => store.ws);

  const doneOrders: Array<number> = [];

  const inProgressOrders: Array<number> = [];

  if (!orders) {
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

  orders.forEach((order) => {
    if (order.status === "done") {
      doneOrders.push(order.number);
    } else {
      inProgressOrders.push(order.number);
    }
  });

  return (

    <div className={styles.orders_list}>
      { status === 'done' &&
        doneOrders.map((number) => {
          return <span key={uuidv4()} className={`text text_type_digits-default ${styles.order_done}`}>#{number}</span>
        })
      }
      {
        inProgressOrders.map((number) => {
          return <span key={uuidv4()} className="text text_type_digits-default">#{number}</span>
        })
      }
    </div>
  )
};
