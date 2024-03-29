import React, { FunctionComponent } from "react";

import { useSelector } from '../../services/hooks';

import styles from './ingredient-card.module.css';

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientMini } from "../ingredient-mini/ingredient-mini";

import { TOrder } from '../../services/types/server-data';

interface IIngCardProps {
  ingredient: string,
  order: TOrder,
  amount: number
}

export const IngredientCard: FunctionComponent<IIngCardProps> = ({ingredient, order, amount}) => {
  const currentOrder = order;

  const number = currentOrder.number;

  const allIngredients = useSelector(store => store.allIngredients.items);

  if (!allIngredients) {
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

  const neededIngredient = allIngredients.find((element) => element._id === ingredient);
  //@ts-ignore
  const name = neededIngredient.name;
  //@ts-ignore
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
