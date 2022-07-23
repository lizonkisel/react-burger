import React from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

import styles from './orders-list.module.css';

export default function OrdersList({status}) {

  const {orders} = useSelector(store => store.ws);

  const doneOrders = [];

  const inProgressOrders = [];

  orders.forEach((order) => {
    if (order.status === "done") {
      doneOrders.push(order.number);
    } else {
      inProgressOrders.push(order.number);
    }
  });

  if (!orders) {
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

  return (

    <div className={styles.orders_list}>
      { status === 'done' &&
        doneOrders.map((number) => {
          return <span className={`text text_type_digits-default ${styles.order_done}`}>#{number}</span>
        })
      }
      {
        inProgressOrders.map((number) => {
          return <span className="text text_type_digits-default">#{number}</span>
        })
      }
    </div>
  )
};

OrdersList.propTypes = {
  status: PropTypes.string.isRequired
}
