import React from "react";
import Button from "../../../components/UI/Button/Button";

import SchoolImg from "../../../images/Skola/about.png";

import "./AboutSection.scss";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="left">
        <h1>Postavte s námi školu... </h1>
        <h2>buď ten, kvůli kterému někteří věří v dobro!</h2>
        <Button classes='btn--primary'>Chci přispět</Button>
      </div>
      <div className="right">
        <div className="img-wrapper">
          <img src={SchoolImg} alt="Škola" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
