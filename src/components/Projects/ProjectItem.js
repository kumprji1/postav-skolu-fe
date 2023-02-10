import React from "react";
import { Link } from 'react-router-dom';

import "./ProjectItem.scss";

const ProjectItem = ({project}) => {
  return (
    <Link to={`/projekt/${project.urlTitle}`} className="project-item">
      <h1 className="project-item__title">
        &rsquo;&rsquo;{project.title}&rsquo;&rsquo;
      </h1>
      <div className="project-item__img--wrapper">
        <img className="project-item__img" src={`${process.env.REACT_APP_BACKEND_URL}` + project.photo}/>
      </div>
    </Link>
  );
};

export default ProjectItem;
