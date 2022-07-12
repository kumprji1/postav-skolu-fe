import React, { Fragment } from "react";

import ProjectItem from "./ProjectItem";

import "./Projects.scss";

const Projects = () => {
  return (
    <Fragment>
      <ProjectItem title="Kup si svoji část pozemku" />
      <ProjectItem title="Zábavné učebny" />
      <ProjectItem title="Pohlazení duše" />
      <ProjectItem title="Nevídaná krása" />
      <ProjectItem title="Aktivní světluška" />
      <ProjectItem title="Práce šlechtí" />
      <ProjectItem title="Ráj na Zemi" />
      <ProjectItem title="Magický kruh bezpečí" />
      <ProjectItem title="Splněný sen" />
      <ProjectItem title="Věci s příběhem" />
      <ProjectItem title="Krásné zbytečnosti" />
    </Fragment>
  );
};

export default Projects;
