import React, { Fragment } from "react";

import ProjectItem from "./ProjectItem";

import "./Projects.scss";

const Projects = ({projects}) => {
  return projects.map(project => <ProjectItem key={project.urlTitle} project={project} />)
};

export default Projects;
