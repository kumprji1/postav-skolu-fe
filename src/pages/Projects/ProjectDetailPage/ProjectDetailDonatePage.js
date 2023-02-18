import React, { Fragment, useCallback, useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from '../../../contexts/AuthContext' 
import { Roles } from "../../../utils/roles";

import Donatables from "../components/Donatables";


import "./ProjectDetailDonatePage.scss";

const ProjectDetailDonatePage = (props) => {
  const auth = useContext(AuthContext)
  return (
    <Fragment>
      {auth.role === Roles.ADMIN && <section className="project-detail-admin-section admin-section">
        <NavLink to={'/upravit/projekt/' + props.project._id} className="btn-warning">Upravit</NavLink>
        <button className="btn-danger-outline btn-small">Odstranit</button>
      </section>}
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
