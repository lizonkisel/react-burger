import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import burgerIngredients from './burger-ingredients.module.css';
import IngredientVariants from '../ingredient-variants/ingredient-variants.jsx';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';

import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/prop-types.js';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import {IngredientContext} from '../../utils/ingredient-context.js';

import {getAllIngredients} from '../../services/actions/index.js';

export default function BurgerIngredients() {

//   const dispatch = useDispatch();

//   useEffect(()=> {
//     // Отправляем экшен-функцию
//     dispatch(getAllIngredients())
// }, []);

  const listOfIngredients = useSelector(store => store.allIngredients.items);

  // const listOfIngredients = useContext(IngredientContext);

    const bunList = listOfIngredients.filter((ingredient) => {
      return ingredient.type === "bun";
    })

    const sauceList = listOfIngredients.filter((ingredient) => {
      return ingredient.type === "sauce";
    })

    const mainList = listOfIngredients.filter((ingredient) => {
      return ingredient.type === "main";
    })

    const ingredientInModal = useSelector(store => store.currentIngredient);

    return (
      <>
        <section className={burgerIngredients.section}>
          <h2 className='text text_type_main-large mb-5 mt-10'>Соберите бургер</h2>
          <nav className={`mb-10 ${burgerIngredients.menu}`}>
            <Tab value="Булки">
              Булки
            </Tab>
            <Tab value="Соусы">
              Соусы
            </Tab>
            <Tab value="Начинки">
              Начинки
            </Tab>
          </nav>
          <article className={burgerIngredients.ingredients}>
            <IngredientVariants ingredientName='Булки' listOfIngredients={bunList} />
            <IngredientVariants ingredientName='Соусы' listOfIngredients={sauceList} />
            <IngredientVariants ingredientName='Начинки' listOfIngredients={mainList} />
          </article>
        </section>

        {ingredientInModal &&
        <Modal title="Детали ингредиента" >
          <IngredientDetails />
        </Modal>}
      </>
    )
}

BurgerIngredients.propTypes = {
  // listOfIngredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}
