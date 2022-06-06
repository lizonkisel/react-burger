import React, { useContext, useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import burgerConstructor from './burger-constructor.module.css';

import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/prop-types.js';

import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';

import {getAllIngredients, getOrder} from '../../services/actions/index.js';


const initialPrice = {price: 0};

function reducer(totalPrice, action) {

  switch(action.type) {
    case 'sum':
      const bunsPrice = action.payload.bun.price * 2;

      const sum = action.payload.filling.reduce((prevVal, item) => {
        return prevVal + item.price
      }, bunsPrice);
      return {price: sum};
    default:
      // throw new Error(`Wrong type of action: ${action.type}`);
      return totalPrice;
  }
}

export default function BurgerConstructor () {

  const listOfIngredients = useSelector(store => store.allIngredients.items);

  /* На данном этапе просто находим первую булку из списка ингредиентов */

  const bun = listOfIngredients.find((ingredient) =>
    ingredient.type === "bun"
  );
  const bunsPrice = bun.price * 2;


  const fillingList = listOfIngredients.filter((ingredient) => {
    return ingredient.type === "sauce" || ingredient.type === "main";
  });


  const isOrderAccepted = useSelector(store => store.order.isOrderAccepted);
  const isReadyForNewOrder = useSelector(store => store.order.isReadyForNewOrder);
  const orderNumber = useSelector(store => store.order.number);



  const ingredientsIdArray = listOfIngredients.map((item) => {
    return item._id
  });

  const dispatch = useDispatch();


  // const initialPrice = {price: 0};

  function reducer(totalPrice, action) {

    switch(action.type) {
      case 'sum':
        const sum = fillingList.reduce((prevVal, item) => {
          return prevVal + item.price
        }, bunsPrice);
        return {price: sum};
      default:
        // throw new Error(`Wrong type of action: ${action.type}`);
        return totalPrice;
    }
  }

  const [totalPrice, dispatchTotalPrice] = useReducer(reducer, initialPrice);


  // function postOrder() {
  //   fetch('https://norma.nomoreparties.space/api/orders', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8'
  //     },
  //     body: JSON.stringify({
  //       "ingredients": ingredientsIdArray
  //     })
  //   })
  //   .then(res => {
  //     if (res.ok) {
  //       return res.json();
  //     } else {
  //       return Promise.reject(res.status)
  //     }
  //   })
  //   .then(res => {setOrderNumber(res.order.number); setIsOrderAccepted(true)})
  //   .catch(err => console.log(`${err}: ${err.status}`))
  // }

  React.useEffect(
    () => {
      dispatchTotalPrice({type: 'sum', payload: {filling: fillingList, bun: bun}});
    }, [listOfIngredients]
  );


  return (
    <>
      <section className='pt-25'>
        <article className={burgerConstructor.compositionArea}>
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
            {
              fillingList.map((ingredient, index) => (
                <li className={burgerConstructor.element} key={ingredient._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                </li>
              ))
            }
          </ul>
          {
            bun &&
            <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            />
          }
        </article>
        <article className={`mt-10 ${burgerConstructor.info}`}>
          <div className={burgerConstructor.priceArea}>
            <p className="text text_type_digits-medium">
              {
                totalPrice.price
              }
            </p>
            <div className={burgerConstructor.currentIcon}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          <Button type="primary" size="large" onClick={() => /* postOrder() */ dispatch(getOrder(ingredientsIdArray))}>
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
