import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { Navigate } from "react-router-dom";


const WithAuthPoker = (Component) => {
  const AuthRoute = () => {
    const { store, actions } = useContext(Context);
    
    const isAuth = store.logOutConfirmationpoker;
    if (isAuth) {
      return <Component />;
    } else {
      return <Navigate to='/poker-login'/>;
    }
  };

  return AuthRoute;
};
export default WithAuthPoker
