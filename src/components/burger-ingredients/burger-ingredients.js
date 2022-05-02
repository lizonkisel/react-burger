import burgerIngredients from './burger-ingredients.module.css';
import Ingredient from '../indredient/ingredient.js'

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerIngredients () {
    return (
        <section className={burgerIngredients.section}>
            <h2>Соберите бургер</h2>
            <nav className={burgerIngredients.menu}>
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
            <Ingredient ingredientName='Булки'/>
            <Ingredient ingredientName='Соусы'/>
            <Ingredient ingredientName='Начинки'/>
        </section>
    )
}