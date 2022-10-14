import React, { FunctionComponent } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useDispatch, useSelector } from '../../services/hooks';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';

import styles from './draggable-ingredient.module.css';

import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/prop-types.js';

import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredient } from '../../services/types/server-data';

interface IDragIngProps {
  ingredient: TIngredient
}

// export default function DraggableIngredient: FunctionComponent<IDragIngProps>({ingredient}) {
export const DraggableIngredient: FunctionComponent<IDragIngProps> = ({ingredient}) => {

  const ingredientsCount = useSelector(store => store.constructorIngredients.ingredientsCount);
  const bun = useSelector(store => store.constructorIngredients.ingredients.bun);

  const id = ingredient._id;

  function setCount() {
    if (bun !== null && bun._id === ingredient._id) {
      const count = 1;
      return count;
    }
    const count = ingredientsCount.find(element => element.itemId === ingredient._id) === undefined ?
    null :
    // @ts-ignore
    ingredientsCount.find(element => element.itemId === ingredient._id).count;
    return count;
  };

  const startCount = setCount();

  const dispatch = useDispatch();

  const location = useLocation();

  // console.log(location);

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient
  });

  return (
    <li className={` ${styles.card}`} ref={dragRef} draggable>
      {/* <Link className={styles.link} to={{pathname: `/ingredients/${id}`, state: { prevPath: location.pathname }}}> */}
      <Link className={styles.link} to={{pathname: `/ingredients/${id}`, state: {background: location}}}>
        <img className={`ml-4 mr-4 ${styles.image}`} src={ingredient.image} />
        { startCount &&
          // @ts-ignore
          <Counter count={setCount()} size="default" />
        }
        <div className={styles.priceArea}>
          <p className={`text text_type_digits-default ${styles.price}`}>{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.title}`}>{ingredient.name}</p>
      </Link>
    </li>
  )
};

// DraggableIngredient.propTypes = {
//   ingredient: ingredientPropTypes.isRequired
// }
