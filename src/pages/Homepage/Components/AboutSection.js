import React from "react";
import Button from "../../../components/UI/Button/Button";

import DiaLogoBG from "../../../images/Diakonie/Diakonie_Logo_znak.png";

import "./AboutSection.scss";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="left">
        <h1>Postavte s námi školu... </h1>
        <h2>buď ten, kvůli kterému někteří věří v dobro!</h2>
        <Button classes="btn--primary">Chci pomoci</Button>
      </div>
      <div className="right">
        <div className="img-wrapper">
          <img src={DiaLogoBG} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
