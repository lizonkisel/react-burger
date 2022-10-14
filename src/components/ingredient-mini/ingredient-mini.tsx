import React, { FunctionComponent } from "react";
// import { useSelector } from "react-redux";
import { useSelector } from '../../services/hooks';
import PropTypes from 'prop-types';

import styles from './ingredient-mini.module.css';

import { defaultBunUrl } from "../../utils/utils";
import { TIngredient } from "../../services/types/server-data";

interface IIngredientMiniProps {
  ingredient: string | null
}

// export default function IngredientMini({ingredient}) {
export const IngredientMini: FunctionComponent<IIngredientMiniProps> = ({ingredient}) => {

  if (ingredient === null) {
    return <img className={styles.image} src={defaultBunUrl}></img>
  };

  const allIngredients = useSelector(store => store.allIngredients.items);
  const isLoading = useSelector(store => store.allIngredients.isLoading);

  // if (isLoading) {
  //   return <p className="text text_type_main-medium">Загружаем данные...</p>
  // }

  // let ingredientData = {image: 'sdkjsdk'};

  // if (allIngredients) {
  //   ingredientData = allIngredients.find(element => element._id === ingredient);
  //   console.log(ingredientData);
  //   console.log(ingredientData.name);
  //   console.log(ingredientData.image);
  // }

  //@ts-ignore
  const ingredientData = allIngredients.find(element => element._id === ingredient);
  // console.log(ingredientData.name);
  // console.log(ingredientData.image);
  // const ingredientImage = ingredientData.image;
  // console.log(ingredientImage);


  return (
    // <img src={ingredientData.image}></img>
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

IngredientMini.propTypes = {
  ingredient: PropTypes.string.isRequired
}
