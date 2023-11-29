import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, Navigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import Footer from "../component/Footer/Footer.js";

import "@material-ui/icons";
import { forwardRef } from "react";
import "../../styles/menu.css";
import Logo from "../../img/logobyn.png";

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
          <span className="text-high-emphasis-inverse" style={{ fill: "darkslategrey" }}><i class="fab fa-facebook"></i></span>
        </a>
        <br />
        <a className="twitter" href="https://twitter.com/Qualex_Corp" target="_blank">
          <span className="text-high-emphasis-inverse" style={{ fill: "darkslategrey" }}><i class="fab fa-twitter"></i></span>
        </a>
        <br />
        <a className="linkedin" href="https://www.linkedin.com/company/qualexconsulting" target="_blank">
          <span className="text-high-emphasis-inverse" style={{ fill: "darkslategrey" }}><i class="fab fa-linkedin"></i></span>
        </a>
        <br />
        <a className="youtube" href="https://www.youtube.com/user/QualexConsulting/videos" target="_blank">
          <span className="text-high-emphasis-inverse" style={{ fill: "darkslategrey" }}><i class="fab fa-youtube"></i></span>
        </a>
        <br />
      </div>
      <Footer/>
    </>

  );
};

//export default WithAuthPoker(MenuView)
export default Home