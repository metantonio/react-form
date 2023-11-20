import React, { useState, useContext } from "react";
import '../scss/style.scss'
import { Context } from "./store/appContext";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import { Suspense, lazy } from "react";

import ScrollToTop from "./component/scrollToTop";

import Home from './views/home.js';

import injectContext from "./store/appContext";

import { Navbar2 } from "./component/Navbar2/navbar2.jsx";

import Error404 from "./views/404/404.jsx";

const Loginqruser = lazy(() => import('./views/user/login.js'));

import { Userqrregister } from "./views/user/signup.js";

const CambioPassword = lazy(() => import('./views/user/changePassword.js'))





//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";
  const { store, actions } = useContext(Context)

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          {/* {store.logOutConfirmation ? <Navbar2 /> : <></>} */}
          <Navbar2 />
          {/* {store.logOutConfirmation ? <IAInput /> : <></>} */}
          <Suspense fallback={<div className="spinner-border text-primary" />}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Loginqruser />
              </Route>
              <Route exact path="/signup">
                <Userqrregister />
              </Route>
              <Route exact path="/update-password">
                <CambioPassword />
              </Route>
              <Route exact path="*">
                <Error404 />
              </Route>
            </Switch>
          </Suspense>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
