import React, { useEffect, useState } from "react";

// Hooks
import { useParams } from "react-router-dom";

import { useHttp } from "../../../hooks/http-hook";

import BTitle from "../../../components/Base/BTitle/BTitle";
import EditProjectForm from "./EditProjectForm";

import "./EditProjectPage.scss";

const EditProjectPage = () => {
  // Data
  const [project, setProject] = useState();

  // Hooks
  const { projectId } = useParams();
  const { sendRequest } = useHttp();

  // Fetch project data by projectId
  useEffect(() => {
    const fetchProject = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/projects/${projectId}`
      );
      setProject(responseData);
    };
    fetchProject();
  }, [projectId]);

  return (
    <section className="edit-project-section">
      <BTitle>Úprava projektu</BTitle>
      {project && <EditProjectForm project={project} />}
    </section>
  );
};

export default EditProjectPage;
