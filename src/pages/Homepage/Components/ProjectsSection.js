import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import Projects from "../../../components/Projects/Projects";
import { AuthContext } from "../../../contexts/AuthContext";

import { useHttp } from "../../../hooks/http-hook";
import { Roles } from "../../../utils/roles";

import "./ProjectsSection.scss";
import SwingSpinner from "../../../components/UI/Spinners/SwingSpinner";
import ErrorModal from "../../../components/Error/ErrorModal";

const ProjectsSection = () => {
  const auth = useContext(AuthContext)
  const [projects, setProjects] = useState([]);
  const { sendRequest, isLoading, error, clearError } = useHttp();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/projects`
        );
        setProjects(responseData);
      } catch (err) {}
    };
    fetchProjects();
  }, [sendRequest]);

  return (
    <>
          <h1 className="projects-section--title">Přehled sbírek s výtěžkem pro výstavbu školy:</h1>
          <section className="projects-section">
      {isLoading && <SwingSpinner isLoading={isLoading} />}
      {error && <ErrorModal error={error} onClear={clearError} />}
      <Projects projects={projects} />
      {auth.role == Roles.ADMIN && <NavLink className='bbutton-outline' to="/novy-projekt">Nový projekt</NavLink>}
    </section>

    </>
  );
};

export default ProjectsSection;
