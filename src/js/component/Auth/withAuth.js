import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { Navigate } from "react-router-dom";


const WithAuth = (Component) => {
  const AuthRoute = () => {
    const { store, actions } = useContext(Context);
    
    const isAuth = store.logOutConfirmation;
    if (isAuth) {
      return <Component />;
    } else {
      return <Navigate to='/iq-login'/>;
    }
  };

  return AuthRoute;
};
export default WithAuth


