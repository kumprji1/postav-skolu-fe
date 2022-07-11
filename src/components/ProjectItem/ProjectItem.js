import React from "react";

import "./ProjectItem.scss";

const ProjectItem = (props) => {
  return (
    <div className="project-item">
        <div className="project-item__percentage">48%</div>
      <h1 className="project-item__title">&rsquo;&rsquo;{props.title}&rsquo;&rsquo;</h1>
    </div>
  );
};

export default ProjectItem;
