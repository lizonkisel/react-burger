import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import {useHistory} from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';

import burgerConstructor from './burger-constructor.module.css';

import FillingIngredient from '../filling-ingredient/filling-ingredient';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';

import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';

import { addToConstructor } from '../../services/actions/constructor-ingredients.js';
// import { CLEAR_CONSTRUCTOR } from '../../services/actions/constructor-ingredients.js';
import {getOrder} from '../../services/actions/order.js';
import { closeOrder} from '../../services/actions/order.js';


export default function BurgerConstructor () {

  const constructorIngredients = useSelector(store => store.constructorIngredients.ingredients.fillings);

  const bun = useSelector(store => store.constructorIngredients.ingredients.bun);

  const bunsPrice = bun === null ?
  0 :
  bun.price * 2;

  const isOrderRejected = useSelector(store => store.order.isOrderRejected);
  const isOrderModalClosed = useSelector(store => store.order.isOrderModalClosed);
  const orderNumber = useSelector(store => store.order.number);

  function getIngredientsIdArray() {
    const ingredientsIdArray = [];
    if (bun !== null) {
      ingredientsIdArray.push(bun._id)
    };
    constructorIngredients.forEach((filling) => {
      ingredientsIdArray.push(filling._id);
    });
    if (bun !== null) {
      ingredientsIdArray.push(bun._id)
    };

    return ingredientsIdArray;
  };

  const dispatch = useDispatch();

  const price = useMemo(() => {
    return (
      constructorIngredients.reduce((prevVal, curVal) => prevVal + curVal.price, bunsPrice)
    );
  }, [constructorIngredients]);

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      // dispatch({
      //   type: ADD_TO_CONSTRUCTOR,
      //   item: item,
      //   uId: uuidv4()
      // })
      dispatch(addToConstructor(item))
    }
  });

  const { isAuth, isAuthChecked } = useSelector(store => store.auth);
  const history = useHistory();

  function placeOrder() {
    if (!isAuth && isAuthChecked) {

      history.replace({pathname: '/login'})
    } else {
      dispatch(getOrder(getIngredientsIdArray()));
      // dispatch({type: CLEAR_CONSTRUCTOR});
    }
  }

  return (
    <>
      <section className={`${burgerConstructor.section} pt-20`}>
        <article className={`${burgerConstructor.compositionArea} pt-5`} ref={dropRef}>
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
                <FillingIngredient item={ingredient} index={i} key={ingredient.uId}>
                </FillingIngredient>
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
          {/* <Button type="primary" size="large" onClick={() => {dispatch(getOrder(getIngredientsIdArray()))}}> */}
          <Button type="primary" size="large" onClick={() => {placeOrder()}}>
            Оформить заказ
          </Button>
        </article>
      </section>

      {
        !isOrderRejected &&
        !isOrderModalClosed &&
        (
          <Modal
            title=""
            onClose={() => dispatch(closeOrder())}
          >
            <OrderDetails
              orderNumber={orderNumber}
            />
          </Modal>
        )
      }
    </>
  )
}
