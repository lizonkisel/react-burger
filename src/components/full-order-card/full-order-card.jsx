import React from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function FullOrderCard() {

  const {id} = useParams();

  // const currentIngredient = useSelector(store => store.currentIngredient);

  const allIngredients = useSelector(store => store.allIngredients.items);

  if (!allIngredients) {
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

  return (
    <div>Card</div>
  )
}
