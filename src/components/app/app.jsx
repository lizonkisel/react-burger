import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, BrowserRouter, Route, useLocation, useHistory } from 'react-router-dom';

import AppHeader from '../app-header/app-header.jsx';

import ProtectedRoute from '../protected-route/protected-route.jsx';
import {LoginPage, ConstructorPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, OrdersPage, IngredientPage, Page404} from '../../pages/index.jsx';

import { getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/utils';
import {getAllIngredients} from '../../services/actions/all-ingredients.js';

import Modal from '../../components/modal/modal.jsx';
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

function App() {

  const dispatch = useDispatch();

  // console.log(location);
  // const background = location.state?.background;
  // const { background } = location.state || { background: location };

  console.log(getCookie('token'));

  // const allIngredients = useSelector(store => store.allIngredients.items);
  // console.log(allIngredients);

  useEffect(()=> {
    dispatch(getAllIngredients());
    console.log(allIngredients);
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const allIngredients = useSelector(store => store.allIngredients.items);
  console.log(allIngredients);

  const history = useHistory();

  const closeIngredientModal = useCallback(
    () => {
      history.replace({pathname: '/'})
    }, [history]
  );

  const location = useLocation();
  console.log(location);

  // const background = location.state?.background;
  const { background } = location.state || { location };
  console.log(background);

  return (
    <>
        {/* <AppHeader /> */}
        {/* <BrowserRouter> */}
        <AppHeader />
          <Switch location={background}>
          {/* <Switch> */}
            <Route path='/' exact={true}>
              <ConstructorPage/>
            </Route>

            <Route path='/login' exact={true}>
              <LoginPage/>
            </Route>

            <Route path='/register'>
              <RegisterPage/>
            </Route>


            <Route path='/forgot-password'>
              <ForgotPasswordPage/>
            </Route>

            <Route path='/reset-password'>
              <ResetPasswordPage/>
            </Route>

            <ProtectedRoute path='/profile' exact={true}>
              <ProfilePage/>
            </ProtectedRoute>

            <ProtectedRoute path='/profile/orders' exact={true}>
              <OrdersPage/>
            </ProtectedRoute>

            <Route path='/ingredients/:id' exact={true}>
              <IngredientPage/>
            </Route>

            <Route>
              <Page404/>
            </Route>
          </Switch>

          {background && (
            <Route
              path="/ingredients/:id"
              children={
                <Modal title="Детали ингредиента" onClose={closeIngredientModal} >
                {/* <Modal title="Детали ингредиента"> */}
                  <IngredientDetails />
                </Modal>
              }
            />)
          }
        {/* </BrowserRouter> */}

    </>
  );
}

export default App;
