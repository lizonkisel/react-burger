import React  from 'react';
import { useSelector } from 'react-redux';

import ingredientDetails from './ingredient-details.module.css';

import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/prop-types.js';

export default function IngredientDetails() {

const currentIngredient = useSelector(store => store.currentIngredient);

  return (
    <article className={ingredientDetails.card}>
      <img className={ingredientDetails.image} src={currentIngredient.image_large} />
      <h4 className='mt-4 mb-8 text text_type_main-medium'>{currentIngredient.name}</h4>
      <ul className={`mb-15 ${ingredientDetails.nutritionalValue}`}>
        <li className={`text text_type_main-default text_color_inactive ${ingredientDetails.component}`}>
          <p className={ingredientDetails.componentName}>Калории,ккал</p>
          <span className='text_type_digits-default'>{currentIngredient.calories}</span>
        </li>
        <li className={`text text_type_main-default text_color_inactive ${ingredientDetails.component}`}>
          <p className={ingredientDetails.componentName}>Белки, г</p>
          <span className='text_type_digits-default'>{currentIngredient.proteins}</span>
        </li>
        <li className={`text text_type_main-default text_color_inactive ${ingredientDetails.component}`}>
          <p className={ingredientDetails.componentName}>Жиры, г</p>
          <span className='text_type_digits-default'>{currentIngredient.fat}</span>
        </li>
        <li className={`text text_type_main-default text_color_inactive ${ingredientDetails.component}`}>
          <p className={ingredientDetails.componentName}>Углеводы, г</p>
          <span className='text_type_digits-default'>{currentIngredient.carbohydrates}</span>
        </li>
      </ul>
    </article>
  )
}

// IngredientDetails.propTypes = {
//   ingredient: ingredientPropTypes.isRequired
// }
