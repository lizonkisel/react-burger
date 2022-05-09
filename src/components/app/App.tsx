import React from 'react';
import styles from './App.module.css';

import {data} from '../../utils/data.js';

import AppHeader from '../app-header/app-header.js'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';

function App() {
  return (
    <>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients listOfIngredients={data} />
          <BurgerConstructor />
        </main>
    </>
  );
}

export default App;
