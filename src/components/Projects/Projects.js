import React, { Fragment } from "react";

import ProjectItem from "./ProjectItem";

import "./Projects.scss";

const projectData = [{
  type: 'donate',
  title: 'Zábavné učebny',
  urlPath: 'zabavne-ucebny',
  desc: 'Popis',
  photo: 'url_fotky',
  earnedMoney: 11_000,
  maxMoney: 50_000
},{
  type: 'products',
  title: 'Zábavné učebny',
  urlPath: 'zabavne-ucebny',
  desc: 'Popis',
  photo: 'url_fotky',
  earnedMoney: 20_000,
  maxMoney: 50_000
},{
  type: 'donate-land',
  title: 'Zábavné učebny',
  urlPath: 'zabavne-ucebny',
  desc: 'Popis',
  photo: 'url_fotky',
  earnedMoney: 30_000,
  maxMoney: 50_000
}]

const Projects = () => {
  return projectData.map(project => <ProjectItem key={project.urlPath} project={project} />)
};

export default Projects;
