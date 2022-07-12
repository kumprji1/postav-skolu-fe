import React from "react";
import { Link } from 'react-router-dom';

import "./ProjectItem.scss";

const ProjectItem = (props) => {
  return (
    <Link to='/kup-si-svoji-cast-pozemku' className="project-item">
      <div className="project-item__percentage">48%</div>
      <h1 className="project-item__title">
        &rsquo;&rsquo;{props.title}&rsquo;&rsquo;
      </h1>
    </Link>
  );
};

export default ProjectItem;
