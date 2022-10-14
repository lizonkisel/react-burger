import React, { useCallback } from "react";
// import { useSelector } from 'react-redux';
import { useSelector } from '../services/hooks';
import { useHistory, useLocation } from 'react-router-dom';

// import Modal from '../components/modal/modal.jsx';
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

  // const location = useLocation();

  if (!allIngredients) {
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

  // if (location.state !== undefined && location.state.prevPath === '/') {
  //   return (
  //     <Modal title="Детали ингредиента" onClose={closeIngredientModal}>
  //     <IngredientDetails />
  //   </Modal>
  //   )
  // } else {
    return (
      <main>
        <IngredientDetails />
      </main>
    )
  // };
}
