import React, { FunctionComponent } from "react";
// import { useSelector } from "react-redux";
import { useSelector } from '../../services/hooks';
import PropTypes from 'prop-types';

import styles from './orders-list.module.css';

interface IOrderListProps {
  status: string
}

// export default function OrdersList({status}) {
export const OrdersList: FunctionComponent<IOrderListProps> = ({status}) => {

  const {orders} = useSelector(store => store.ws);

  //@ts-ignore
  const doneOrders = [];

  //@ts-ignore
  const inProgressOrders = [];

  //@ts-ignore
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
        //@ts-ignore
        doneOrders.map((number) => {
          return <span className={`text text_type_digits-default ${styles.order_done}`}>#{number}</span>
        })
      }
      {
        //@ts-ignore
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
