import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { Switch, BrowserRouter, Route, useLocation, useHistory, RouteComponentProps } from 'react-router-dom';

import AppHeader from '../app-header/app-header';

import { ProtectedRoute } from '../protected-route/protected-route';
import {LoginPage, ConstructorPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, OrdersPage, IngredientPage, FeedPage, OrderDetailsPage, Page404} from '../../pages/index.jsx';

import { getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/utils';
import {getAllIngredients} from '../../services/actions/all-ingredients';

import {Modal} from '../modal/modal';
import IngredientDetails from "../ingredient-details/ingredient-details";
import FullOrderCard from '../full-order-card/full-order-card';

import { TEmptyFunction } from '../../services/types/utils';

function App() {

  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(getAllIngredients());
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const allIngredients = useSelector(store => store.allIngredients.items);

  const history = useHistory();

  const closeIngredientModal = useCallback<TEmptyFunction>(
    () => {
      history.replace({pathname: '/'})
    }, [history]
  );

  const closeOrderModal = useCallback<TEmptyFunction>(
    () => {
      history.goBack()
    }, [history]
  );

  const location = useLocation<{background: {
    key: string
    pathname: string
    search: string
    hash: string
    state: unknown
  }}>();

  const { background } = location.state || { location };

  return (
    <>
        <AppHeader />
          <Switch location={background}>
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

            <Route path='/feed' exact={true}>
              <FeedPage/>
            </Route>

            <Route path='/feed/:id' exact={true}>
              <OrderDetailsPage secured={false}/>
            </Route>

            {
              <ProtectedRoute path='/profile' exact={true}>
                <ProfilePage/>
              </ProtectedRoute>
            }

            {

              <ProtectedRoute path='/profile/orders' exact={true}>
                <OrdersPage/>
              </ProtectedRoute>
            }

            {

              <ProtectedRoute path='/profile/orders/:id' exact={true}>
                <OrderDetailsPage secured={true}/>
              </ProtectedRoute>
            }

            <Route path='/ingredients/:id' exact={true}>
              <IngredientPage/>
            </Route>

            <Route>
              <Page404/>
            </Route>
          </Switch>

          {background && (
            <>
              <Route
                path="/ingredients/:id"
                children={
                  <Modal title="Детали ингредиента" onClose={closeIngredientModal} >
                  {/* <Modal title="Детали ингредиента"> */}
                    <IngredientDetails />
                  </Modal>
                }
              />

              <Route
                path="/feed/:id"
                children={
                  <Modal title="" onClose={closeOrderModal}>
                    <FullOrderCard></FullOrderCard>
                  </Modal>
                }
              />

              <Route
                path="/profile/orders/:id"
                children={
                  <Modal title="" onClose={closeOrderModal}>
                    <FullOrderCard></FullOrderCard>
                  </Modal>
                }
              />
            </>
            )
          }
    </>
  );
}

export default App;
