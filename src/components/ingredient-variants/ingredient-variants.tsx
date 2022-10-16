import React, {forwardRef}  from 'react';

import ingredientVariants from './ingredient-variants.module.css';

import { DraggableIngredient } from '../draggable-ingredient/draggable-ingredient';
import { TIngredient } from '../../services/types/server-data';

interface Props {
  listOfIngredients: ReadonlyArray<TIngredient>,
  titleId: string,
  ingredientName: string,
}

export type Ref = HTMLUListElement;

export const IngredientVariants = forwardRef<Ref, Props>((props, ref) => {
  const ingredients = props.listOfIngredients;

  return (
    <section id={props.titleId}>
      <h3 className="text text_type_main-medium">{props.ingredientName}</h3>
      <ul className={`pl-4 pr-4 pb-10 pt-6 ${ingredientVariants.list}`} ref={ref}>
        {
          ingredients.map((ingredient, index) => (
            <DraggableIngredient ingredient={ingredient} key={index}>
            </DraggableIngredient>
          ))
        }
      </ul>

    </section>
  )
})
