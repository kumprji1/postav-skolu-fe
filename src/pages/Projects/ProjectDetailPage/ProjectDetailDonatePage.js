import React, { Fragment, useCallback, useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from '../../../contexts/AuthContext' 
import { Roles } from "../../../utils/roles";

import Donatables from "../components/Donatables";
import News from "../components/News/News";


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
            src={props.project.photo}
          />
        </div>
        <p className="project-detail-desc">{props.project.desc}</p>
      </section>
      <News urlTitle={props.project.urlTitle} projectId={props.project._id} />
      <Donatables project={props.project} />
      {/* <DonationOptions preparedPrices={props.project.preparedPrices} project={props.project} /> */}
    </Fragment>
  );
};

export default ProjectDetailDonatePage;
