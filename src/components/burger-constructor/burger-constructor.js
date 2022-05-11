import burgerConstructor from './burger-constructor.module.css';

import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';


export default function BurgerConstructor ({listOfIngredients}) {
  return (
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
            listOfIngredients.map((ingredient, index) => (
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
              listOfIngredients.reduce((prevVal, item) => {
                return prevVal + item.price
              }, 0)
            }
          </p>
          <div className={burgerConstructor.currentIcon}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </article>
    </section>
  )
}
