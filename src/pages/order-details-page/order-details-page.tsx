import React, { useEffect, useCallback, FunctionComponent } from "react";
import { useDispatch, useSelector } from '../../services/hooks';
import { useHistory, useLocation } from 'react-router-dom';

import styles from './order-details-page.module.css';

import FullOrderCard from "../../components/full-order-card/full-order-card";

import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../services/constants/wsActionTypes";
import { wsInitAction, wsInitWithTokenAction } from "../../services/actions/wsActions";

import { wsBaseUrl, getCookie } from "../../utils/utils";

import { TEmptyFunction } from '../../services/types/utils';

interface IOrderDetailsPageProps {
  secured: boolean
}

export const OrderDetailsPage: FunctionComponent<IOrderDetailsPageProps> = ({ secured }) => {

  const allIngredients = useSelector(store => store.allIngredients.items);

  const history = useHistory();

  const closeOrderModal = useCallback<TEmptyFunction>(
    () => {
      history.replace({pathname: '/feed'})
    }, [history]
  );

  const accessToken = getCookie('token');

  const dispatch = useDispatch();

  useEffect(() => {
    secured
    ? dispatch(wsInitWithTokenAction(`${wsBaseUrl}/orders?token=${accessToken}`))
    : dispatch(wsInitAction());
  }, [dispatch, accessToken]);

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
