import React, { useState, useContext } from "react";
import '../scss/style.scss'
import { Context } from "./store/appContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import ScrollToTop from "./component/scrollToTop";

import Home from './views/home.js';

import injectContext from "./store/appContext";

import { Navbar2 } from "./component/Navbar2/navbar2.jsx";

import Error404 from "./views/404/404.jsx";

const Loginqruser = lazy(() => import('./views/user/login.js'));

import { Userqrregister } from "./views/user/signup.js";

const CambioPassword = lazy(() => import('./views/user/changePassword.js'))

import TestRunner from "./views/tutorial-html/testRunner.jsx";
import TestRunnerUnix from "./views/tutorial-unix/testRunner.jsx";


const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";
  const { store, actions } = useContext(Context)

  return (
    <div>
      <Router basename={basename}>
        <ScrollToTop>
          {/* {store.logOutConfirmation ? <Navbar2 /> : <></>} */}
          <Navbar2 />
          {/* {store.logOutConfirmation ? <IAInput /> : <></>} */}
          <Suspense fallback={<div className="spinner-border text-primary" />}>
            <Routes>
              <Route exact path="/" element={<Home />} />         
              <Route exact path="/login" element={<Loginqruser />} />                
              <Route exact path="/signup" element={<Userqrregister />} />            
              <Route exact path="/update-password" element={<CambioPassword />} />   
              <Route exact path="/html-tutorial" element={<TestRunner />} />
              <Route exact path="/unix-tutorial" element={<TestRunner />} />      
              <Route exact path="*" element={<Error404 />} />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </Router>
    </div>
  );
};

export default injectContext(Layout);
