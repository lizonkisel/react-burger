import React from "react";

import styles from './order-card.module.css';

export default function OrderCard({ order }) {

  console.log(order);
  const number = order.number;
  const date = order.createdAt;
  const name = order.name;
  const ingredients = order.ingredients;
  console.log(ingredients);

  return (
    <article className={styles.card}>
      <div className={styles.order_data}>
        <span className="text text_type_digits-default">#{number}</span>
        <time>{date}</time>
      </div>
      <h2 className={`text text_type_main-medium ${styles.order_header}`}>{name}</h2>
      <div className={styles.ingredients}>
        {/* ingredients.map((ingredient) => {
          return {

          }
        }) */}
      </div>
    </article>
  )
}

