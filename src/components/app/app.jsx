import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

import {getAllIngredients} from '../../services/actions/all-ingredients.js';


function App() {

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getAllIngredients())
  }, []);

  const {isLoading, isFailed} = useSelector(store => store.allIngredients)

  const listOfIngredients = useSelector(store => store.allIngredients.items);

  return (
    <>
        <AppHeader />
        <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>

            {
              isLoading && <p className="text text_type_main-medium">Загружаем данные...</p>
            }
            {
              isFailed && <p className="text text_type_main-medium">Не удаётся загрузить данные. Пожалуйста, повторите попытку</p>
            }
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
