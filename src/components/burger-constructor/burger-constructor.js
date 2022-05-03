import burgerConstructor from './burger-constructor.module.css';

import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';

const data = [
  {
    "_id":"60666c42cc7b410027a1a9b9",
    "name":"Соус традиционный галактический",
    "type":"sauce",
    "proteins":42,
    "fat":24,
    "carbohydrates":42,
    "calories":99,
    "price":15,
    "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
    "__v":0
   },
   {
    "_id":"60666c42cc7b410027a1a9b4",
    "name":"Мясо бессмертных моллюсков Protostomia",
    "type":"main",
    "proteins":433,
    "fat":244,
    "carbohydrates":33,
    "calories":420,
    "price":1337,
    "image":"https://code.s3.yandex.net/react/code/meat-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
    "__v":0
   },
   {
    "_id":"60666c42cc7b410027a1a9bc",
    "name":"Плоды Фалленианского дерева",
    "type":"main",
    "proteins":20,
    "fat":5,
    "carbohydrates":55,
    "calories":77,
    "price":874,
    "image":"https://code.s3.yandex.net/react/code/sp_1.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
    "__v":0
   },
   {
    "_id":"60666c42cc7b410027a1a9bb",
    "name":"Хрустящие минеральные кольца",
    "type":"main",
    "proteins":808,
    "fat":689,
    "carbohydrates":609,
    "calories":986,
    "price":300,
    "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
    "__v":0
   },
   {
    "_id":"60666c42cc7b410027a1a9bb",
    "name":"Хрустящие минеральные кольца",
    "type":"main",
    "proteins":808,
    "fat":689,
    "carbohydrates":609,
    "calories":986,
    "price":300,
    "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
    "__v":0
   }
]


export default function BurgerConstructor () {
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
            data.map((ingredient, index) => (
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
              data.reduce((prevVal, item) => {
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
