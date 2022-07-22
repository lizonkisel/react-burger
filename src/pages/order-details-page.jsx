import React, { useCallback } from "react";
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import styles from './order-details-page.module.css';

import Modal from '../components/modal/modal.jsx';
import FullOrderCard from "../components/full-order-card/full-order-card.jsx";


export default function OrderDetailsPage() {

  const allIngredients = useSelector(store => store.allIngredients.items);

  const history = useHistory();

  const closeOrderModal = useCallback(
    () => {
      history.replace({pathname: '/feed'})
    }, [history]
  );

  const location = useLocation();

  console.log("Order Details Page");

  console.log(allIngredients);

  if (!allIngredients) {
    console.log('azaza');
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

  // if (location.state !== undefined && location.state.prevPath === '/feed') {
  //   return (
  //     <Modal title="Детали заказа" onClose={closeOrderModal}>
  //       <FullOrderCard></FullOrderCard>
  //     </Modal>
  //   )
  // } else {
    return (
      <main className={styles.main}>
        <FullOrderCard></FullOrderCard>
      </main>
    )

}
