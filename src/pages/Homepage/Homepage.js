import React, { Fragment } from "react";

import AboutSection from "./Components/AboutSection";
import ImageSection from "./Components/ImageSection";
import ProjectsSection from "./Components/ProjectsSection";
import MainProjectTease from "./Components/MainProjectTease";

const Homepage = () => {
  return (
    <Fragment>
      <AboutSection />
      <MainProjectTease />
      <ProjectsSection />
    </Fragment>
  );
};

export default Homepage;
