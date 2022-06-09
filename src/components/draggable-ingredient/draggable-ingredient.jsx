import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';

import styles from './draggable-ingredient.module.css';

import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import {getCurrentIngredient} from '../../services/actions/index.js';

export default function DraggableIngredient({ingredient}) {

  const ingredientsCount = useSelector(store => store.constructorIngredients.ingredientsCount);
  const bun = useSelector(store => store.constructorIngredients.ingredients.bun);
  console.log(bun);

  function setCount() {
    if (bun !== null && bun._id === ingredient._id) {
      const count = 1;
      return count;
    }
    const count = ingredientsCount.find(element => element.itemId === ingredient._id) === undefined ?
    null :
    ingredientsCount.find(element => element.itemId === ingredient._id).count;
    return count;
  };

  const startCount = setCount();

  // useEffect(() => {
  //   console.log('Use effect');
  //   count = ingredientsCount.find(element => element.itemId === ingredient._id) === undefined ?
  //   0 :
  //   ingredientsCount.find(element => element.itemId === ingredient._id).count;

  //   console.log(count);
  // }, [ingredientsCount]);

  // console.log(count);

  const dispatch = useDispatch();

  function chooseIngredient(ingredient) {
    console.log(ingredientsCount);
    dispatch(getCurrentIngredient(ingredient));
  };

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient
  });

  return (
    <li className={` ${styles.card}`} onClick={() => {chooseIngredient(ingredient)}} ref={dragRef}>
      <img className={`ml-4 mr-4 ${styles.image}`} src={ingredient.image} />
      { startCount &&
        <Counter count={setCount()} size="default" />
      }
      <div className={styles.priceArea}>
        <p className={`text text_type_digits-default ${styles.price}`}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.title}`}>{ingredient.name}</p>
    </li>
  )
};
