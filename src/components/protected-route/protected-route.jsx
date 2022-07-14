import React, { useState, useEffect } from "react";
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { getUser } from '../../services/actions/user.js';

export default function ProtectedRoute({ children, ...rest }) {

  const location = useLocation();

  const { user } = useSelector(store => store.auth);

  const {isAuthChecked} = useSelector(store => store.auth);

  console.log(`Is auth checked: ${isAuthChecked}`);

  if (!isAuthChecked) {
    return ( <p className="text text_type_main-medium">Загружаем данные...</p>
    )
  };

  if (isAuthChecked) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user ? (
            children
          ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: location }
            }} />
          )
        }
      />
    )
  };

}
