import React, { useCallback } from "react";
import { useSelector } from '../services/hooks';
import { useHistory, useLocation } from 'react-router-dom';

import IngredientDetails from "../components/ingredient-details/ingredient-details";

import { TEmptyFunction } from "../services/types/utils";


export default function IngredientPage() {

  const allIngredients = useSelector(store => store.allIngredients.items);

  const history = useHistory();

  const closeIngredientModal = useCallback<TEmptyFunction>(
    () => {
      history.replace({pathname: '/'})
    }, [history]
  );

  if (!allIngredients) {
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

  return (
    <main>
      <IngredientDetails />
    </main>
  )

}
