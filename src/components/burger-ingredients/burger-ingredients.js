import burgerIngredients from './burger-ingredients.module.css';
import IngredientVariants from '../ingredient-variants/ingredient-variants.js'

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerIngredients () {
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
          <IngredientVariants type='bun' ingredientName='Булки'/>
          <IngredientVariants type='sauce' ingredientName='Соусы'/>
          <IngredientVariants type='main' ingredientName='Начинки'/>
        </article>
      </section>
    )
}
