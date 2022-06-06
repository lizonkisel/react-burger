import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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



  // const [ingredients, setIngredients] = React.useState(null);

  // function getIngredients() {
  //   fetch(dataUrl)
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         return Promise.reject(res.status);
  //       }
  //     })
  //     .then(data => setIngredients(data.data))
  //     .catch(err => console.log(`Ошибка ${err}: ${err.status}`))
  // }

  // React.useEffect(
  //   () => {
  //     getIngredients();
  //   },
  //   []
  // );

  return (
    <>
        <AppHeader />
        <main className={styles.main}>
            <>
            {
              listOfIngredients &&
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
            }
            </>
        </main>
    </>
  );
}

export default App;
