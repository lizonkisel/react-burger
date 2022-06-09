import React, { useContext, useReducer, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import burgerConstructor from './burger-constructor.module.css';

import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/prop-types.js';

import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';

import {getAllIngredients, getOrder, ADD_TO_CONSTRUCTOR, DELETE_FROM_CONSTRUCTOR} from '../../services/actions/index.js';


// const initialPrice = {price: 0};

// function reducer(totalPrice, action) {

//   switch(action.type) {
//     case 'sum':
//       const bunsPrice = action.payload.bun.price * 2;

//       const sum = action.payload.filling.reduce((prevVal, item) => {
//         return prevVal + item.price
//       }, bunsPrice);
//       return {price: sum};
//     default:
//       // throw new Error(`Wrong type of action: ${action.type}`);
//       return totalPrice;
//   }
// }

export default function BurgerConstructor () {

  const listOfIngredients = useSelector(store => store.allIngredients.items);

  const constructorIngredients = useSelector(store => store.constructorIngredients.ingredients.fillings);

  const bun = useSelector(store => store.constructorIngredients.ingredients.bun);

  const bunsPrice = bun === null ?
  0 :
  bun.price * 2;

  /* На данном этапе просто находим первую булку из списка ингредиентов */

  // const bun = bunIngredient.find((ingredient) =>
  //   ingredient.type === "bun"
  // );
  // const bunsPrice = bun.price * 2;


  // const fillingList = listOfIngredients.filter((ingredient) => {
  //   return ingredient.type === "sauce" || ingredient.type === "main";
  // });


  const isOrderAccepted = useSelector(store => store.order.isOrderAccepted);
  const isReadyForNewOrder = useSelector(store => store.order.isReadyForNewOrder);
  const orderNumber = useSelector(store => store.order.number);



  const ingredientsIdArray = listOfIngredients.map((item) => {
    return item._id
  });

  const dispatch = useDispatch();


  // const initialPrice = {price: 0};

  // function reducer(totalPrice, action) {

  //   switch(action.type) {
  //     case 'sum':
  //       const sum = constructorIngredients.reduce((prevVal, item) => {
  //         return prevVal + item.price
  //       }, bunsPrice);
  //       return {price: sum};
  //     default:
  //       // throw new Error(`Wrong type of action: ${action.type}`);
  //       return totalPrice;
  //   }
  // }

  // const [totalPrice, dispatchTotalPrice] = useReducer(reducer, initialPrice);


  // React.useEffect(
  //   () => {
  //     dispatchTotalPrice({type: 'sum', payload: {filling: constructorIngredients, bun: bun}});
  //   }, [listOfIngredients]
  // );

  const price = useMemo(() => {
    return (
      constructorIngredients.reduce((prevVal, curVal) => prevVal + curVal.price, bunsPrice)
    );
  }, [constructorIngredients]);

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch({
        type: ADD_TO_CONSTRUCTOR,
        item: item
      })
    }
  });

    function deleteFromConstructor(item, key) {
    console.log(key);
    dispatch({
      type: DELETE_FROM_CONSTRUCTOR,
      item: item,
      key: key
    })
  };

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
                <li className={burgerConstructor.element} key={i}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() => deleteFromConstructor(ingredient, i)}
                  />
                </li>
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
