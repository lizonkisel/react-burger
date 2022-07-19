import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../../components/order-card/order-card";

import { WS_CONNECTION_START } from "../../services/actions/wsActionTypes";

export default function FeedPage() {

  console.log('La-la-la');

  const dispatch = useDispatch();
  const { orders, wsConnected} = useSelector(store => store.ws);

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

  console.log(orders);

  return (
    <main>
      <h1>Лента заказов</h1>
      {
        !wsConnected && <p className="text text_type_main-medium">Загружаем данные...</p>
      }
      {
        wsConnected && orders &&
        <>
          <section>
            {orders.map((order) => {
              return (
                <OrderCard order={order}>

                </OrderCard>
              )
            })}
          </section>
          <section></section>
        </>
      }
    </main>
  )
}
