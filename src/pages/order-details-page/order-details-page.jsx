import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import styles from './order-details-page.module.css';

import Modal from '../../components/modal/modal.jsx';
import FullOrderCard from "../../components/full-order-card/full-order-card.jsx";

import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../services/actions/wsActionTypes";
import { wsInitWithToken } from "../../services/actions/wsActions";

import { getCookie } from "../../utils/utils";

export default function OrderDetailsPage({ secured }) {

  const allIngredients = useSelector(store => store.allIngredients.items);

  const history = useHistory();

  const closeOrderModal = useCallback(
    () => {
      history.replace({pathname: '/feed'})
    }, [history]
  );

  const location = useLocation();

  const accessToken = getCookie('token');

  const dispatch = useDispatch();

  useEffect(() => {
    secured
    ? dispatch(wsInitWithToken(`wss://norma.nomoreparties.space/orders?token=${accessToken}`))
    : dispatch({type: WS_CONNECTION_START});
  }, [dispatch, accessToken]);

  console.log("Order Details Page");

  if (!allIngredients) {
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

    return (
      <main className={styles.main}>
        <FullOrderCard></FullOrderCard>
      </main>
    )

}
