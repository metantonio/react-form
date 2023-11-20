import React from "react";
import "./intro.css";
import logo from "../../../img/logo.png";
import topmost from "../../../img/iqpricing-remove.png";
import RedLine from "../RedLine/RedLine.jsx";
import bgCover from "../../assets/introBackground.jpeg"

const Intro=() =>{
  return (
    <section className="intro">
      <div className="bgImage">
        <div className="content">
          <img src={logo} alt="Not found" />
          <RedLine />
          <h4 className="intro-zIndex">Qualex I-Q Gaming</h4>
          <p className="secondary-text intro-zIndex">
            Offering comprehensive integrative advanced analytic software &
            <br /> mobile app solutions for the gaming/casino industry
          </p>
        </div>
      </div>
    </section>
  );
}

export default Intro;
