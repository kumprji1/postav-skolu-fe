import React from "react";
import { Link } from "react-router-dom";

import SchoolImg from "../../../images/Skola/skola_laplan.png";

import "./ImageSection.scss";

const ImageSection = () => {
  return (
    <section className="school-image-section">
      <img src={SchoolImg} alt="Škola" />
      <div className="btn-main-project-wrapper">
        <Link to={'/projekt/kup-si-svoji-cast-pozemku'} className="">Rád přispěji</Link>
      </div>
    </section>
  );
};

export default ImageSection;
