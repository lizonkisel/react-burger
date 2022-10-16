import React, { FunctionComponent } from "react";
import { useSelector } from '../../services/hooks';

import styles from './ingredient-mini.module.css';

import { defaultBunUrl } from "../../utils/utils";
import { TIngredient } from "../../services/types/server-data";

interface IIngredientMiniProps {
  ingredient: string | null
}

export const IngredientMini: FunctionComponent<IIngredientMiniProps> = ({ingredient}) => {

  if (ingredient === null) {
    return <img className={styles.image} src={defaultBunUrl}></img>
  };

  const allIngredients = useSelector(store => store.allIngredients.items);
  const isLoading = useSelector(store => store.allIngredients.isLoading);

  let ingredientData;

  if (allIngredients != null) {
    ingredientData = allIngredients.find(element => element._id === ingredient);
  }

  return (
    <>
      {
        isLoading && !allIngredients && <p className="text text_type_main-medium">Загружаем данные...</p>
      }
      {
        allIngredients && ingredientData  &&
        <div className={styles.image_wrapper}>
          <img className={styles.image} src={ingredientData.image}></img>
        </div>
      }
    </>
  )
};
