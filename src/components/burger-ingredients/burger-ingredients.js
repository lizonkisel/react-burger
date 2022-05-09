import burgerIngredients from './burger-ingredients.module.css';
import IngredientVariants from '../ingredient-variants/ingredient-variants.js'

import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/prop-types.js';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerIngredients (props) {

    const bunList = props.listOfIngredients.filter((ingredient) => {
      return ingredient.type === "bun";
    })

    const sauceList = props.listOfIngredients.filter((ingredient) => {
      return ingredient.type === "sauce";
    })

    const mainList = props.listOfIngredients.filter((ingredient) => {
      return ingredient.type === "main";
    })

    return (
      <section className={burgerIngredients.section}>
        <h2 className={`text text_type_main-large mb-5 mt-10 ${burgerIngredients.title}`}>Соберите бургер</h2>
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
          <IngredientVariants ingredientName='Булки' listOfIngredients={bunList}/>
          <IngredientVariants ingredientName='Соусы' listOfIngredients={sauceList}/>
          <IngredientVariants ingredientName='Начинки' listOfIngredients={mainList}/>
        </article>
      </section>
    )
}

BurgerIngredients.propTypes = {
  listOfIngredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}
