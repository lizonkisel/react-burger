import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import AppHeader from '../app-header/app-header.jsx';

import ProtectedRoute from '../protected-route/protected-route.jsx';
import {LoginPage, ConstructorPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, OrdersPage, Page404} from '../../pages/index.jsx';

import { getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/utils';

function App() {

  // const { isAuth, isAuthChecked } = useSelector(store => store.auth);

  const dispatch = useDispatch();

  console.log(getCookie('token'));

  const { user } = useSelector(store => store.auth);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  // useEffect(()=> {
  //   if (getCookie('token') !== null) {
  //     dispatch(getUser());
  //     console.log(user);
  //   }
  // }, [isAuth, isAuthChecked]);

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

            {/* <ProtectedRoute path='/login'>
              <LoginPage/>
            </ProtectedRoute> */}

            {/* <ProtectedRoute path='/register'>
              <RegisterPage/>
            </ProtectedRoute> */}

            <Route path='/register'>
              <RegisterPage/>
            </Route>


            <Route path='/forgot-password'>
              <ForgotPasswordPage/>
            </Route>

            {/* <ProtectedRoute path='/forgot-password'>
              <ForgotPasswordPage/>
            </ProtectedRoute> */}

            {/* <ProtectedRoute path='/reset-password'>
              <ResetPasswordPage/>
            </ProtectedRoute> */}

            <Route path='/reset-password'>
              <ResetPasswordPage/>
            </Route>

            <ProtectedRoute path='/profile'>
              <ProfilePage/>
            </ProtectedRoute>

            <ProtectedRoute path='/profile/orders'>
              <OrdersPage />
            </ProtectedRoute>

            {/* <Route path='/profile' exact={true}>
              <ProfilePage/>
            </Route> */}

            {/* <Route path='/profile/orders' exact={true}>
              <OrdersPage />
            </Route> */}

            <Route>
              <Page404/>
            </Route>
          </Switch>
        </BrowserRouter>

    </>
  );
}

export default App;
