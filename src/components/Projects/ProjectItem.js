import React from "react";
import { Link } from 'react-router-dom';

import "./ProjectItem.scss";

const ProjectItem = ({project}) => {
  return (
    <Link to={`/projekt/${project.urlTitle}`} className="project-item">
      {project.type !== 'products' && <div className="project-item__percentage">{project.earnedMoney / project.maxMoney * 100}%</div>}
      <h1 className="project-item__title">
        &rsquo;&rsquo;{project.title}&rsquo;&rsquo;
      </h1>
    </Link>
  );
};

export default ProjectItem;
