import React from 'react';
// import { useSelector } from 'react-redux';
import { useSelector } from '../../services/hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './constructor-page.module.css';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor.jsx';

export default function ConstructorPage() {

  console.log('Constructor Page');

  const {isLoading, isFailed} = useSelector(store => store.allIngredients);
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
