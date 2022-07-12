import React, { Fragment } from "react";

import AboutSection from "./Components/AboutSection";
import ImageSection from "./Components/ImageSection";
import ProjectsSection from "./Components/ProjectsSection";

const Homepage = () => {
  return (
    <Fragment>
      <AboutSection />
      <ImageSection />
      <ProjectsSection />
    </Fragment>
  );
};

export default Homepage;
