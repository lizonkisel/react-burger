import React from "react";

import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

import styles from './ingredient-card.module.css';

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientMini from "../ingredient-mini/ingredient-mini";

import { orderPropTypes } from "../../utils/prop-types";

export default function IngredientCard({ingredient, order, amount}) {

  const currentOrder = order;

  const number = currentOrder.number;
  // const name = currentOrder.name;

  const allIngredients = useSelector(store => store.allIngredients.items);

  const neededIngredient = allIngredients.find((element) => element._id === ingredient);
  const name = neededIngredient.name;
  const price = neededIngredient.price;

  return (
    <div className={styles.card}>
      <IngredientMini ingredient={ingredient}></IngredientMini>
      <p className={`text text_type_main-default ${styles.name}`}>{name}</p>
      <div className={styles.amount_and_price}>
        <span className="text text_type_digits-default">{amount}</span>
        <span className="text text_type_digits-default">x</span>
        <span className="text text_type_digits-default">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
};

IngredientCard.propTypes = {
  ingredient: PropTypes.string.isRequired,
  order: orderPropTypes.isRequired,
  amount: PropTypes.number.isRequired
}
