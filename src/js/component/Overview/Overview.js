import React from "react";
import "./Overview.css";
import Container from "../Container/Container";
import RedLine from "../RedLine/RedLine.jsx";
import overview from "../../assets/overview.jpeg";
import FindMore from "../FindMore/FindMore";

export default function Overview() {
  return (
    <section className="overview">
      <Container type="smallest">
        <div className="content">
          <img src={overview} alt="No image found" />
          <div className="right">
            <RedLine type="small" />
            <h3 className="title">
              Introducing 
              <br /> QUALEX I-Q Gaming
            </h3>
            <p className="secondary-text">
              Feel the new world <br /> of gaming development
            </p>
            <FindMore text="Find out more" />
          </div>
        </div>
      </Container>
    </section>
  );
}
