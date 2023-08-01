import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";

import DiaLogoBG from "../../../images/Diakonie/Diakonie_Logo_znak.png";
import ImageSection from "./ImageSection";

import "./AboutSection.scss";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="left">
        <h1>Postavte s námi školu...(Já jsem tu taky) </h1>
        <h2>buď ten, kvůli kterému někteří věří v dobro!</h2>
        {/* <Link to="/projekt/kup-si-svoji-cast-pozemku" className="btn--primary">Chci pomoci</Link> */}
      </div>
      <div className="right">
        <div className="img-wrapper">
          <img src={DiaLogoBG} />
        </div>
      </div>
      <ImageSection />
    </section>
  );
};

export default AboutSection;
