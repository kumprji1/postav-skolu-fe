import React, { Fragment, useCallback, useState } from "react";
import Section from "../../../components/Section/Section";
import { useCart } from "../../../hooks/cart-hook";
import Donatables from "../components/Donatables";
import DonationOptions from "../components/DonationOptions";
import ProgressBar from "../components/ProgressBar";

import "./ProjectDetailDonatePage.scss";

const ProjectDetailDonatePage = (props) => {
  const { addDonations } = useCart();

  return (
    <Fragment>
      <section className="project-detail-info-section">
      <h1 className="project-detail-title">{props.project.title}</h1>
        <div className="project-detail-main-img--wrapper">
          <img
            className="project-detail-main-img"
            src={`${process.env.REACT_APP_BACKEND_URL}` + props.project.photo}
          />
        </div>
        <p className="project-detail-desc">{props.project.desc}</p>
      </section>
      <Donatables project={props.project} />
      {/* <DonationOptions preparedPrices={props.project.preparedPrices} project={props.project} /> */}
    </Fragment>
  );
};

export default ProjectDetailDonatePage;
