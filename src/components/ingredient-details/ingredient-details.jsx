import React  from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ingredientDetails from './ingredient-details.module.css';

export default function IngredientDetails() {

  const {id} = useParams();

  // const currentIngredient = useSelector(store => store.currentIngredient);

  const allIngredients = useSelector(store => store.allIngredients.items);

  if (!allIngredients) {
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

  const currentIngredient = allIngredients.find(function(ingredient) {
    return ingredient._id === id;
  });

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
