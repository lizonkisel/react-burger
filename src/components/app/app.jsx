import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

import {LoginPage, ConstructorPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, OrdersPage, Page404} from '../../pages/index.jsx';

import {getAllIngredients} from '../../services/actions/all-ingredients.js';


function App() {

  // const dispatch = useDispatch();

  // useEffect(()=> {
  //   dispatch(getAllIngredients())
  // }, []);

  // const {isLoading, isFailed} = useSelector(store => store.allIngredients)

  // const listOfIngredients = useSelector(store => store.allIngredients.items);

  return (
    <>
        {/* <AppHeader /> */}
        <BrowserRouter>
        <AppHeader />
          <Switch>
            <Route path='/' exact={true}>
              <ConstructorPage/>
            </Route>

            <Route path='/login' exact={true}>
              <LoginPage/>
            </Route>

            <Route path='/register' exact={true}>
              <RegisterPage/>
            </Route>

            <Route path='/forgot-password' exact={true}>
              <ForgotPasswordPage/>
            </Route>

            <Route path='/reset-password' exact={true}>
              <ResetPasswordPage/>
            </Route>

            <Route path='/profile' exact={true}>
              <ProfilePage/>
            </Route>

            <Route path='/profile/orders' exact={true}>
              <OrdersPage />
            </Route>

            <Route>
              <Page404/>
            </Route>
          </Switch>
        </BrowserRouter>

        {/* <main className={styles.main}>
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
        </main> */}
    </>
  );
}

export default App;
