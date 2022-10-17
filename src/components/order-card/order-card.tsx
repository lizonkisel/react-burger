import React, { FunctionComponent } from "react";
import { useSelector } from '../../services/hooks';
import { Link, useLocation, useRouteMatch} from 'react-router-dom';

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientMini } from "../ingredient-mini/ingredient-mini";
import moment from 'moment';
import 'moment/locale/ru';

import { TOrder } from "../../services/types/server-data";

import styles from './order-card.module.css';

interface IOrderCardProps {
  order: TOrder
}

export const OrderCard: FunctionComponent<IOrderCardProps> = ({ order }) => {
  moment.locale('ru', {
    calendar : {
      lastDay : '[Вчера,] LT',
      sameDay : '[Сегодня,] LT',
      sameElse: 'DD/MM/YYYY',
  }
  });

  const number = order.number;
  const date = Date.parse(order.createdAt);
  const name = order.name;
  const ingredients = order.ingredients;

  const id = order._id;

  let drawableIngredients;

  if (ingredients.length < 5) {
    drawableIngredients = ingredients;
  } else {
    drawableIngredients = ingredients.slice(0, 5);
  };

  const allIngredients = useSelector(store => store.allIngredients.items);

  if (!allIngredients) {
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

  const priceArray: Array<number> = [];

  ingredients.forEach((ingredient) => {
    const neededIngredient = allIngredients.find((element) => element._id === ingredient);

    if (neededIngredient) {
      priceArray.push(neededIngredient.price);
    }
  })

  const cost = priceArray.reduce((sum, price) => sum + price, 0);

  const location = useLocation();

  const { path } = useRouteMatch<string>();

  return (
      <Link className={styles.link} to={{pathname: `${path}/${id}`, state: {background: location}}}>
        <article className={styles.card}>
        <div className={styles.order_data}>
          <span className="text text_type_digits-default">#{number}</span>
          <time className="text text_type_main-default text_color_inactive">{`${moment(date).utcOffset("+03:00").calendar()} i-GMT+3`}</time>
        </div>
        <h2 className={`text text_type_main-medium ${styles.order_header}`}>{name}</h2>
        <div className={styles.ingredients_and_cost}>
          <div className={styles.ingredients}>
            {
                drawableIngredients.map((ingredient, index) => {
                return (
                  <IngredientMini key={index} ingredient={ingredient}>
                  </IngredientMini>
                )
              })
            } {
              ingredients.length > 5 &&
              <div className={styles.rest_ingredients}>
                <div className={`text text_type_main-default ${styles.additional_quantity}`}>+{ingredients.length - 5}</div>
                <div className={styles.shadow}>
                  <IngredientMini ingredient={ingredients[5]}>
                  </IngredientMini>
                </div>
              </div>
            }
          </div>
          <div className={styles.cost_area}>
            <div className='text text_type_digits-default'>{cost}</div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        </article>
      </Link>
  )
};
