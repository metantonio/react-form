import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, Navigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import MaterialTable from "material-table";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "@material-ui/icons";
import { forwardRef } from "react";
import "../../styles/menu.css";
import Logo from "../../img/logobyn.png";


import WithAuthPoker from "../component/Auth/withAuthPoker.js";
import Intro from "../component/Intro/Intro.jsx";
import Brand from "../component/Brand/Brand.js";
import Specs from "../component/Specs/Specs.js";
import Overview from "../component/Overview/Overview.js";
import Footer from "../component/Footer/Footer.js";
import Services from "../component/Services/Services.js";

import { Navbar2 } from "../component/Navbar2/navbar2.jsx";

const Home = () => {
  const { store, actions } = useContext(Context);
  const history = Navigate("");
  /* const volverLogin = () => {
    actions.logOut();
    return history.push("/");
  }; */
  useEffect(() => {
    actions.checkUser();
  }, [])
  return (
    <>
      <div className="social_right_block" style={{ position: "fixed", top: "40%", right: "0%", zIndex: 99, padding: "10px", backgroundColor: "#FFF" }}>
        <a className="facebook" href="https://www.facebook.com/pages/Qualex-Consulting-Services-Inc/553252344725767" target="_blank">
          <span className="text-high-emphasis-inverse" style={{ fill: "darkslategrey" }}>Facebook</span>
        </a>
        <br />
        <a className="twitter" href="https://twitter.com/Qualex_Corp" target="_blank">
          <span className="text-high-emphasis-inverse" style={{ fill: "darkslategrey" }}>Twitter</span>
        </a>
        <br />
        <a className="linkedin" href="https://www.linkedin.com/company/qualexconsulting" target="_blank">
          <span className="text-high-emphasis-inverse" style={{ fill: "darkslategrey" }}>LinkedIn</span>
        </a>
        <br />
        <a className="youtube" href="https://www.youtube.com/user/QualexConsulting/videos" target="_blank">
          <span className="text-high-emphasis-inverse" style={{ fill: "darkslategrey" }}>Youtube</span>
        </a>
        <br />
      </div>
    </>

  );
};

//export default WithAuthPoker(MenuView)
export default Home