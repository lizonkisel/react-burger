import React from 'react';
import styles from './App.module.css';

import {dataUrl} from '../../utils/data.js';
import {data} from '../../utils/data.js';

import AppHeader from '../app-header/app-header.js'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import Modal from '../modal/modal.js';

function App() {

  const [ingredients, setIngredients] = React.useState([]);

  function getIngredients() {
    fetch(dataUrl)
      .then(res => res.json())
      .then(data => setIngredients(data.data))
      .catch(err => console.log(`Ошибка ${err}: ${err.status}`))
  }

  React.useEffect(
    () => {
      getIngredients();
    },
    []
  );

  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(true);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [isOrderAcceptedOpened, setIsOrderAcceptedOpened] = React.useState(false);

  function closeAllModals() {
    setIsIngredientDetailsOpened(false);
    setIsOrderDetailsOpened(false);
    setIsOrderAcceptedOpened(false);
  }

  function closeByEscape(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeAllModals();
    }
  }


  return (
    <>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients listOfIngredients={ingredients} />
          <BurgerConstructor />
        </main>
        {
          isIngredientDetailsOpened &&
          <Modal
            title="Детали ингредиента"
            onOverlayClick={closeAllModals}
            onEscapeClick={closeByEscape}
          />
        }
        {
          isOrderDetailsOpened &&
          <Modal
            title="Детали заказа"
            onOverlayClick={closeAllModals}
            onEscapeClick={closeByEscape}
          />
        }
        {
          isOrderAcceptedOpened &&
          <Modal
            title="Заказ принят"
            onOverlayClick={closeAllModals}
            onEscapeClick={closeByEscape}
          />
        }

    </>
  );
}

export default App;
