import React, { useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

import styles from './full-order-card.module.css';

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientCard} from "../ingredient-card/ingredient-card";
import { statuses } from "../../utils/utils";

import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../services/constants/wsActionTypes";
import { wsActions } from "../../services/constants/wsActionTypes";

type TIdParam = {
  id: string
};

export default function FullOrderCard() {

  moment.locale('ru', {
    calendar : {
      lastDay : '[Вчера,] LT',
      sameDay : '[Сегодня,] LT',
      // lastWeek: '[Прошлый] dddd',
      sameElse: 'DD/MM/YYYY',
  }
  });

  const {id} = useParams<TIdParam>();

  const dispatch = useDispatch();
  // const { orders, wsConnected, total, totalToday} = useSelector(store => store.ws);


  // const {onClose} = wsActions;

  // useEffect(() => {
  //   dispatch({type: WS_CONNECTION_START});
  //   return () => {
  //     dispatch({type: WS_CONNECTION_CLOSED});
  //   };
  // }, [dispatch]);



  const allIngredients = useSelector(store => store.allIngredients.items);

  // if (!allIngredients) {
  //   return ( <p className="text text_type_main-medium">Загружаем данные...</p>
  //   )
  // };

  const orders = useSelector(store => store.ws.orders);

  if (!orders) {
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

  const currentOrder = orders.find((order) => order._id === id);

  console.log(orders);
  console.log(currentOrder);

  if (currentOrder === undefined) {
    return ( <p className="text text_type_main-medium">Не удалось найти такой заказ...</p>
    )
  }

  const number = currentOrder.number;
  const ingredients = currentOrder.ingredients;
  const name = currentOrder.name;
  const date = Date.parse(currentOrder.createdAt);
  const currentStatus = currentOrder.status;

  console.log(currentStatus);

  //@ts-ignore
  const status = statuses[currentStatus];

  console.log(status);

  const uniqIngredientsObj = {};

  const ingredientsObj = {...ingredients};

  ingredients.forEach((ingredient) => {
    //@ts-ignore
    if (!uniqIngredientsObj[ingredient]) {
      //@ts-ignore
      uniqIngredientsObj[ingredient] = 1
    } else {
      //@ts-ignore
      uniqIngredientsObj[ingredient] += 1
    }
  });

  const uniqIngredients = Object.entries(uniqIngredientsObj);


  const priceArray: Array<number> = [];
  ingredients.forEach((ingredient) => {
    //@ts-ignore
    const neededIngredient = allIngredients.find((element) => element._id === ingredient);
    //@ts-ignore
    priceArray.push(neededIngredient.price);
  })

  const cost: number = priceArray.reduce((sum, price) => sum + price, 0);


  if (!orders) {
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

  if (!allIngredients) {
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

  return (
    <section className={styles.card}>
      <span className={`text text_type_digits-default ${styles.number}`}>#{number}</span>
      <h2 className={`text text_type_main-medium ${styles.order_header}`}>{name}</h2>
      <span className={`text text_type_main-default ${styles.status}`}>{status}</span>

      <div className={styles.composition}>
        <span className={`text text_type_main-medium`}>Состав:</span>
        <div className={styles.ingredients_area}>
          {
            uniqIngredients.map((ingredient) => {
              return (
                //@ts-ignore
                <IngredientCard order={currentOrder} ingredient={ingredient[0]} amount={ingredient[1]}></IngredientCard>
              )
            })
          }
        </div>
      </div>

      <div className={styles.time_and_cost}>
        <time className="text text_type_main-default text_color_inactive">{`${moment(date).utcOffset("+03:00").calendar()} i-GMT+3`}</time>
        <div className={styles.cost_field}>
          <div className='text text_type_digits-default'>{cost}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  )
}
