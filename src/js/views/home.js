import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/appContext.js";
//import Footer from "../component/Footer/Footer.js";
import Block from "../component/block.jsx";

import "@material-ui/icons";
import { forwardRef } from "react";
import "../../styles/menu.css";
import Logo from "../../img/logo.png";
import "./home.module.css"
/* import tutoHtml from "../../img/tutorial-html.jpg"
import tutoUnix from "../../img/tutorial-unix.jpg"
import tutoPython from "../../img/tutorial-python.jpg"
import tutoJavascript from "../../img/tutorial-javascript.jpg" */

const Home = () => {
  const { store, actions } = useContext(Context);
  const history = useHistory("");
  /* const volverLogin = () => {
    actions.logOut();
    return history.push("/");
  }; */
  /* useEffect(() => {
    actions.checkUser();
  }, []) */
  return (
    <>
      <main className={`
      d-flex
      [animation:linear_reveal_both]
      [animation-range:entry_5%_cover_30%]
      [animation-timeline:view()]
      `}>
        {/* <Block
          title="HTML"
          imageUrl={tutoHtml}
          link="/html-tutorial"
        />
        <Block
          title="JAVASCRIPT"
          imageUrl={tutoJavascript}
          link="/javascript-tutorial"
        />
        <Block
          title="PYTHON"
          imageUrl={tutoPython}
          link="/python-tutorial"
        />
        <Block
          title="UNIX"
          imageUrl={tutoUnix}
          link="/unix-tutorial"
        /> */}
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