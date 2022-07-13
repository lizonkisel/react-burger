import React, { useCallback } from "react";
import { useSelector } from 'react-redux';

import Modal from '../components/modal/modal.jsx';
import IngredientDetails from "../components/ingredient-details/ingredient-details";

import { getCurrentIngredient } from "../services/actions/current-ingredient.js";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';

export default function IngredientPage() {

  const allIngredients = useSelector(store => store.allIngredients.items);
  console.log(allIngredients);

  const dispatch = useDispatch();

  const history = useHistory();
  console.log(history);
  console.log(history.location);

  const closeIngredientModal = useCallback(
    () => {
      history.replace({pathname: '/'})
    }, [history]
  );

  const location = useLocation();

  // const prevLocation = location.state.prevPath || null;

  if (location.state !== undefined && location.state.prevPath === '/') {
  // if (prevLocation === '/') {
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
