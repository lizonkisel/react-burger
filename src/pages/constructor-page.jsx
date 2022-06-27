import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './constructor-page.module.css';

import AppHeader from '../components/app-header/app-header.jsx';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../components/burger-constructor/burger-constructor.jsx';

import {getAllIngredients} from '../services/actions/all-ingredients.js';


export default function ConstructorPage() {

  console.log('Constructor Page');
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getAllIngredients())
  }, []);

  const {isLoading, isFailed} = useSelector(store => store.allIngredients)

  const listOfIngredients = useSelector(store => store.allIngredients.items);

  return (
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
  )
}
