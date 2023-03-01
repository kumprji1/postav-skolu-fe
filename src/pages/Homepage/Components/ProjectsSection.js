import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import Projects from "../../../components/Projects/Projects";
import { AuthContext } from "../../../contexts/AuthContext";

import { useHttp } from "../../../hooks/http-hook";
import { Roles } from "../../../utils/roles";

import "./ProjectsSection.scss";

const ProjectsSection = () => {
  const auth = useContext(AuthContext)
  const [projects, setProjects] = useState([]);
  const { sendRequest } = useHttp();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/get-projects-by-category/dvur`
        );
        setProjects(responseData);
      } catch (err) {}
    };
    fetchProjects();
  }, [sendRequest]);

  return (
    <section className="projects-section">
      <h1 className="title">Přehled projektů s výtěžkem pro výstavbu školy:</h1>
      <Projects projects={projects} />
      {auth.role == Roles.ADMIN && <NavLink className='bbutton-outline' to="/novy-projekt">Nový projekt</NavLink>}
    </section>
  );
};

export default ProjectsSection;
