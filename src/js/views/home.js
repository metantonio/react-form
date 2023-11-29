import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, Navigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
//import Footer from "../component/Footer/Footer.js";
import Block from "../component/block.jsx";

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
  /* useEffect(() => {
    actions.checkUser();
  }, []) */
  return (
    <>
      <main>
        <Block
          title="Sección 1"
          imageUrl="URL de la imagen 1"
          link="/seccion1"
        />
        <Block
          title="Sección 2"
          imageUrl="URL de la imagen 2"
          link="/seccion2"
        />
        <Block
          title="Sección 3"
          imageUrl="URL de la imagen 3"
          link="/seccion3"
        />
        <Block
          title="Sección 4"
          imageUrl="URL de la imagen 4"
          link="/seccion4"
        />
      </main>
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
    </>

  );
};

//export default WithAuthPoker(MenuView)
export default Home