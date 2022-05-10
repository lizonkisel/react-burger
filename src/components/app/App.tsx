import React from 'react';
import styles from './App.module.css';

import {dataUrl} from '../../utils/data.js';
import {data} from '../../utils/data.js';

import AppHeader from '../app-header/app-header.js'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';

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

  return (
    <>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients listOfIngredients={ingredients} />
          <BurgerConstructor />
        </main>
    </>
  );
}

export default App;
