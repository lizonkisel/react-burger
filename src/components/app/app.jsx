import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import AppHeader from '../app-header/app-header.jsx';

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

    </>
  );
}

export default App;
