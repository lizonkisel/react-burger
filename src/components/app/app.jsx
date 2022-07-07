import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import AppHeader from '../app-header/app-header.jsx';

import ProtectedRoute from '../protected-route/protected-route.jsx';
import {LoginPage, ConstructorPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, OrdersPage, Page404} from '../../pages/index.jsx';

function App() {

  return (
    <>
        {/* <AppHeader /> */}
        <BrowserRouter>
        <AppHeader />
          <Switch>
            <Route path='/' exact={true}>
              <ConstructorPage/>
            </Route>

            {/* <Route path='/login' exact={true}>
              <LoginPage/>
            </Route> */}

            <ProtectedRoute path='/login'>
              <LoginPage/>
            </ProtectedRoute>

            <ProtectedRoute path='/register'>
              <RegisterPage/>
            </ProtectedRoute>

            <ProtectedRoute path='/forgot-password'>
              <ForgotPasswordPage/>
            </ProtectedRoute>

            <ProtectedRoute path='/reset-password'>
              <ResetPasswordPage/>
            </ProtectedRoute>

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
