import React from 'react';

import burgerConstructor from './burger-constructor.module.css';

import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/prop-types.js';

import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal.js';
import OrderDetails from '../order-details/order-details.js';


export default function BurgerConstructor ({listOfIngredients}) {

  const fillingList = listOfIngredients.filter((ingredient) => {
    return ingredient.type === "sauce" || ingredient.type === "main";
  })

  const [isOrderAccepted, setIsOrderAccepted] = React.useState(false);

  return (
    <>
      <section className='pt-25'>
        <article className={burgerConstructor.compositionArea}>
          <ConstructorElement className={burgerConstructor.element}
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
          />
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
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
          />
        </article>
        <article className={`mt-10 ${burgerConstructor.info}`}>
          <div className={burgerConstructor.priceArea}>
            <p className="text text_type_digits-medium">
              {
                fillingList.reduce((prevVal, item) => {
                  return prevVal + item.price
                }, 0)
              }
            </p>
            <div className={burgerConstructor.currentIcon}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          <Button type="primary" size="large" onClick={() => {setIsOrderAccepted(true)}}>
            Оформить заказ
          </Button>
        </article>
      </section>

      {
        isOrderAccepted &&
        <Modal
          title=""
          onClose={setIsOrderAccepted}
        >
          <OrderDetails />
        </Modal>
      }
    </>
  )
}

BurgerConstructor.propTypes = {
  listOfIngredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}
