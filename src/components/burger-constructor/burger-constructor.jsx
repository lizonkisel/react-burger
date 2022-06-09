import React, { useContext, useReducer, useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import burgerConstructor from './burger-constructor.module.css';

import FillingIngredient from '../filling-ingredient/filling-ingredient';

import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/prop-types.js';

import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';

import {ADD_TO_CONSTRUCTOR} from '../../services/actions/constructor-ingredients.js';
import {getOrder} from '../../services/actions/order.js';

export default function BurgerConstructor () {

  const listOfIngredients = useSelector(store => store.allIngredients.items);

  const constructorIngredients = useSelector(store => store.constructorIngredients.ingredients.fillings);

  const bun = useSelector(store => store.constructorIngredients.ingredients.bun);

  const bunsPrice = bun === null ?
  0 :
  bun.price * 2;

  const isOrderAccepted = useSelector(store => store.order.isOrderAccepted);
  const isReadyForNewOrder = useSelector(store => store.order.isReadyForNewOrder);
  const orderNumber = useSelector(store => store.order.number);

  const ingredientsIdArray = listOfIngredients.map((item) => {
    return item._id
  });

  const dispatch = useDispatch();

  // const price = 0;

  const price = useMemo(() => {
    return (
      constructorIngredients.reduce((prevVal, curVal) => prevVal + curVal.price, bunsPrice)
    );
  }, [constructorIngredients]);

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      console.log('New Drop item')
      dispatch({
        type: ADD_TO_CONSTRUCTOR,
        item: item
      })
    }
  });

  // const [] = useDrag({
  //   type: 'ingredient'
  // });

  // function deleteFromConstructor(item, key) {
  //   console.log(key);
  //   dispatch({
  //     type: DELETE_FROM_CONSTRUCTOR,
  //     item: item,
  //     key: key
  //   })
  // };

  return (
    <>
      <section className='pt-25'>
        <article className={burgerConstructor.compositionArea} ref={dropRef}>
          {
            bun &&
            <ConstructorElement className={burgerConstructor.element}
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            />
          }
          <ul className={burgerConstructor.compositionChangebleList}>

              {constructorIngredients && constructorIngredients.map((ingredient, i) => (

                <FillingIngredient item={ingredient} index={i} key={i}>

                </FillingIngredient>
                // <li className={burgerConstructor.element} key={i} draggable>
                //   <DragIcon type="primary" />
                //   <ConstructorElement
                //     text={ingredient.name}
                //     price={ingredient.price}
                //     thumbnail={ingredient.image}
                //     handleClose={() => deleteFromConstructor(ingredient, i)}
                //   />
                // </li>
              ))}

          </ul>
          {
            bun &&
            <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            />
          }
        </article>
        <article className={`mt-10 ${burgerConstructor.info}`}>
          <div className={burgerConstructor.priceArea}>
            <p className="text text_type_digits-medium">
              {
                price
              }
            </p>
            <div className={burgerConstructor.currentIcon}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          <Button type="primary" size="large" onClick={() => dispatch(getOrder(ingredientsIdArray))}>
            Оформить заказ
          </Button>
        </article>
      </section>

      {
        isOrderAccepted && !isReadyForNewOrder &&
        <Modal
          title=""
        >
          <OrderDetails
            orderNumber={orderNumber}
          />
        </Modal>
      }
    </>
  )
}

BurgerConstructor.propTypes = {
  // listOfIngredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}
