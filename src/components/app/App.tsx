import React from 'react';
import styles from './App.module.css';

import {dataUrl} from '../../utils/data.js';
import {data} from '../../utils/data.js';

import AppHeader from '../app-header/app-header.js'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import Modal from '../modal/modal.js';
import IngredientDetails from '../ingredient-details/ingredient-details.js';
import OrderDetails from '../order-details/order-details.js';

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

  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(false);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [isOrderAcceptedOpened, setIsOrderAcceptedOpened] = React.useState(true);

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

  function closeByCross() {
    closeAllModals();
  }

  return (
    <>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients listOfIngredients={ingredients} />
          <BurgerConstructor listOfIngredients={ingredients}/>
        </main>
        {
          isIngredientDetailsOpened &&
          <Modal
            title="Детали ингредиента"
            onOverlayClick={closeAllModals}
            onEscapeClick={closeByEscape}
            onCrossClick={closeByCross}
          >
            <IngredientDetails
              ingredient={{
                "_id":"60666c42cc7b410027a1a9b2",
                "name":"Флюоресцентная булка R2-D3",
                "type":"bun",
                "proteins":44,
                "fat":26,
                "carbohydrates":85,
                "calories":643,
                "price":988,
                "image":"https://code.s3.yandex.net/react/code/bun-01.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-01-large.png",
                "__v":0
              }}
            />
          </Modal>
        }
        {
          isOrderDetailsOpened &&
          <Modal
            title="Детали заказа"
            onOverlayClick={closeAllModals}
            onEscapeClick={closeByEscape}
            onCrossClick={closeByCross}
          >

          </Modal>
        }
        {
          isOrderAcceptedOpened &&
          <Modal
            title=""
            onOverlayClick={closeAllModals}
            onEscapeClick={closeByEscape}
            onCrossClick={closeByCross}
          >
            <OrderDetails />
          </Modal>
        }

    </>
  );
}

export default App;
