import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';

import AppHeader from '../app-header/app-header.js'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';

function App() {
  return (
    <>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
      }
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
    </>
  );
}

export default App;
