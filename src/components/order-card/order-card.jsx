import React from "react";
import IngredientMini from "../ingredient-mini/ingredient-mini.jsx";
import moment from 'moment';

import styles from './order-card.module.css';

export default function OrderCard({ order }) {

  moment().format();
  console.log(moment);
  console.log(order);
  const number = order.number;
  // const date = order.createdAt;
  const date = new Date(Date.parse(order.createdAt)).toLocaleString();
  const name = order.name;
  const ingredients = order.ingredients;
  console.log(ingredients);

  console.log(date);

  return (
    <article className={styles.card}>
      <div className={styles.order_data}>
        <span className="text text_type_digits-default">#{number}</span>
        <time>{date}</time>
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

