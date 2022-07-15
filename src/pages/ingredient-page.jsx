import React, { useCallback } from "react";
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import Modal from '../components/modal/modal.jsx';
import IngredientDetails from "../components/ingredient-details/ingredient-details";


export default function IngredientPage() {

  const allIngredients = useSelector(store => store.allIngredients.items);

  const history = useHistory();

  const closeIngredientModal = useCallback(
    () => {
      history.replace({pathname: '/'})
    }, [history]
  );

  const location = useLocation();

  if (!allIngredients) {
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

  if (location.state !== undefined && location.state.prevPath === '/') {
    return (
      <Modal title="Детали ингредиента" onClose={closeIngredientModal}>
      <IngredientDetails />
    </Modal>
    )
  } else {
    return (
      <main>
        <IngredientDetails />
      </main>
    )
  };

  // return (
  //   <main>
  //     {/* <Modal title="Детали ингредиента" onClose={() => dispatch(getCurrentIngredient(null))}> */}
  //     <Modal title="Детали ингредиента" onClose={closeIngredientModal}>
  //       <IngredientDetails />
  //     </Modal>
  //   </main>
  // )
}
