import React  from 'react';
import { useDispatch } from 'react-redux';

import ingredientVariants from './ingredient-variants.module.css';
import PropTypes from 'prop-types';

import {ingredientPropTypes} from '../../utils/prop-types.js';

import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import {getCurrentIngredient} from '../../services/actions/index.js';


export default function IngredientVariants(props) {
  const ingredients = props.listOfIngredients;

  const dispatch = useDispatch();

  function chooseIngredient(ingredient) {
    dispatch(getCurrentIngredient(ingredient));
  }


  return (
    <section>
      <h3 className="text text_type_main-medium">{props.ingredientName}</h3>
      <ul className={`pl-4 pr-4 pb-10 pt-6 ${ingredientVariants.list}`}>
        {
          ingredients.map((ingredient, index) => (
            <li className={` ${ingredientVariants.card}`} key={ingredient._id} onClick={() => {chooseIngredient(ingredient)}}>
              <img className={`ml-4 mr-4 ${ingredientVariants.image}`} src={ingredient.image} />
              <Counter count={1} size="default" />
              <div className={ingredientVariants.priceArea}>
                <p className={`text text_type_digits-default ${ingredientVariants.price}`}>{ingredient.price}</p>
                <CurrencyIcon type="primary" />
              </div>
              <p className={`text text_type_main-default ${ingredientVariants.title}`}>{ingredient.name}</p>
            </li>
          ))
        }
      </ul>

    </section>
  )
}

// IngredientVariants.propTypes = {
//   listOfIngredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
//   setIngredientInModal: PropTypes.func.isRequired,
//   ingredientName: PropTypes.oneOf(['Булки', 'Соусы', 'Начинки']).isRequired
// }
