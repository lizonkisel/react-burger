import React, { useState, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { getUser } from '../../services/actions/user.js';

export default function ProtectedRoute({ children, ...rest }) {

  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const { user } = useSelector(store => store.auth);

  const dispatch = useDispatch();

  const init = async () => {
    await dispatch(getUser());
    setIsUserLoaded(true);
  };

  useEffect(() => {
    init()
  }, []);

  if (!isUserLoaded) {
    console.log('There is no user')
    return null
  }

  return (
    <Route
      {...rest}
      render={() =>
        user ? (
          children
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  )
}
