import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './app.module.css';

import {dataUrl} from '../../utils/data.js';

import AppHeader from '../app-header/app-header.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

import {IngredientContext} from '../../utils/ingredient-context.js';

import {getAllIngredients} from '../../services/actions/index.js';


function App() {

  const dispatch = useDispatch();

  useEffect(()=> {
    // Отправляем экшен-функцию
    dispatch(getAllIngredients())
}, []); /* Тут мб нужно в скобки dispatch добавить. Надо понять, нужно ли */

  const listOfIngredients = useSelector(store => store.allIngredients.items);

  return (
    <>
        <AppHeader />
        <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
            {
              listOfIngredients &&
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
            }
            </DndProvider>
        </main>
    </>
  );
}

export default App;
