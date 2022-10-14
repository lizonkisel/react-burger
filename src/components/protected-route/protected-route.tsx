import React, { ReactElement, FunctionComponent } from "react";
import { Route, Redirect, useLocation } from 'react-router-dom';
// import { useSelector } from "react-redux";
import { useSelector } from '../../services/hooks';


interface IProtectedRouteProps {
  path: string,
  exact: boolean
}





// export default function ProtectedRoute({ children, ...rest }) {
//@ts-ignore
export const ProtectedRoute: FunctionComponent<IProtectedRouteProps> = ({ children, ...rest }) => {

  // const location = useLocation();

  const { user } = useSelector(store => store.auth);

  const {isAuthChecked} = useSelector(store => store.auth);

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
