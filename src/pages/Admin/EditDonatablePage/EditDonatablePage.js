import React, { useContext, useEffect, useState } from "react";

// Hooks
import { useParams } from "react-router-dom";

import { useHttp } from "../../../hooks/http-hook";

import BTitle from "../../../components/Base/BTitle/BTitle";
import EditDonatableForm from "./EditDonatableForm";

const EditDonatablePage = () => {
  // Data
  const [donatable, setDonatable] = useState();

  // Hooks
  const { donatableId } = useParams();
  const { sendRequest } = useHttp();

  // Fetch news data by newsId
  useEffect(() => {
    const fetchNews = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/donatables/${donatableId}`
      );
      setDonatable(responseData);
    };
    fetchNews();
  }, [donatableId]);

  return (
    <section className="edit-project-section">
      <BTitle>Úprava sbírky</BTitle>
      {donatable && <EditDonatableForm donatable={donatable} />}
    </section>
  );
};

export default EditDonatablePage;
