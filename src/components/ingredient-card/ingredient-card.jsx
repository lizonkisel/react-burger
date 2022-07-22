import React from "react";

import { useSelector } from "react-redux";

import styles from './ingredient-card.module.css';

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientMini from "../ingredient-mini/ingredient-mini";

export default function IngredientCard({ingredient, order, amount}) {

  const currentOrder = order;

  console.log(currentOrder);

  const number = currentOrder.number;
  // const name = currentOrder.name;

  const allIngredients = useSelector(store => store.allIngredients.items);

  const neededIngredient = allIngredients.find((element) => element._id === ingredient);
  const name = neededIngredient.name;
  const price = neededIngredient.price;

  return (
    <div className={styles.card}>
      <IngredientMini ingredient={ingredient}></IngredientMini>
      <p>{name}</p>
      <div className={styles.amount_and_price}>
        <span className="text text_type_digits-default">{amount}</span>
        <span className="text text_type_digits-default">x</span>
        <span className="text text_type_digits-default">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}
