import React, { useContext } from 'react';

import burgerIngredients from './burger-ingredients.module.css';
import IngredientVariants from '../ingredient-variants/ingredient-variants.jsx';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';

import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/prop-types.js';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import {IngredientContext} from '../../utils/ingredient-context.js';

export default function BurgerIngredients() {

  const listOfIngredients = useContext(IngredientContext);

    const bunList = listOfIngredients.filter((ingredient) => {
      return ingredient.type === "bun";
    })

    const sauceList = listOfIngredients.filter((ingredient) => {
      return ingredient.type === "sauce";
    })

    const mainList = listOfIngredients.filter((ingredient) => {
      return ingredient.type === "main";
    })

    const [ingredientInModal, setIngredientInModal] = React.useState(null);

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
            <IngredientVariants ingredientName='Булки' listOfIngredients={bunList} setIngredientInModal={setIngredientInModal}/>
            <IngredientVariants ingredientName='Соусы' listOfIngredients={sauceList} setIngredientInModal={setIngredientInModal}/>
            <IngredientVariants ingredientName='Начинки' listOfIngredients={mainList} setIngredientInModal={setIngredientInModal}/>
          </article>
        </section>

        {ingredientInModal &&
        <Modal title="Детали ингредиента" onClose={setIngredientInModal}>
          <IngredientDetails ingredient={ingredientInModal}/>
        </Modal>}
      </>
    )
}

BurgerIngredients.propTypes = {
  // listOfIngredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}
