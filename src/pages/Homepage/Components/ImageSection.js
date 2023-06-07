import React from "react";
import Button from "../../../components/UI/Button/Button";

import SchoolImg from "../../../images/Skola/about.png";

import "./ImageSection.scss";

const ImageSection = () => {
  return (
    <section className="school-image-section">
      <img src={SchoolImg} alt="Škola" />
      <div className="btn-wrapper">
        <Button classes="btn--secondary">PŘISPĚT</Button>
      </div>
    </section>
  );
};

export default ImageSection;
