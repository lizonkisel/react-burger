import React from 'react';
import styles from './app.module.css';

import {dataUrl} from '../../utils/data.js';

import AppHeader from '../app-header/app-header.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

import {IngredientContext} from '../../utils/ingredient-context.js';

function App() {

  const [ingredients, setIngredients] = React.useState(null);

  function getIngredients() {
    fetch(dataUrl)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then(data => setIngredients(data.data))
      .catch(err => console.log(`Ошибка ${err}: ${err.status}`))
  }

  React.useEffect(
    () => {
      getIngredients();
    },
    []
  );

  return (
    <>
        <AppHeader />
        <main className={styles.main}>
            {
              ingredients &&
              <IngredientContext.Provider value={ingredients}>
                <BurgerIngredients />
                <BurgerConstructor />
              </IngredientContext.Provider>
            }
        </main>
    </>
  );
}

export default App;
