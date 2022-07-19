import React from "react";
import IngredientMini from "../ingredient-mini/ingredient-mini.jsx";
import moment from 'moment';
import 'moment/locale/ru';

import styles from './order-card.module.css';

export default function OrderCard({ order }) {
  moment.locale('ru', {
    calendar : {
      lastDay : '[Вчера,] LT',
      sameDay : '[Сегодня,] LT',
      // lastWeek: '[Прошлый] dddd',
      sameElse: 'DD/MM/YYYY',
  }
  });

  const number = order.number;
  const date = Date.parse(order.createdAt);
  const name = order.name;
  const ingredients = order.ingredients;

  return (
    <article className={styles.card}>
      <div className={styles.order_data}>
        <span className="text text_type_digits-default">#{number}</span>
        <time className="text text_type_main-default text_color_inactive">{`${moment(date).utcOffset("+03:00").calendar()} i-GMT+3`}</time>
      </div>
      <h2 className={`text text_type_main-medium ${styles.order_header}`}>{name}</h2>
      <div className={styles.ingredients}>
        {
          ingredients.map((ingredient) => {
            return (
              <IngredientMini ingredient={ingredient}>
              </IngredientMini>
            )
          })
        }
      </div>
    </article>
  )
}

