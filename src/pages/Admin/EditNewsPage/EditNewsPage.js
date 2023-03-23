import React, { useContext, useEffect, useState } from "react";

// Hooks
import { useParams } from "react-router-dom";

import { useHttp } from "../../../hooks/http-hook";

import BTitle from "../../../components/Base/BTitle/BTitle";
import EditNewsForm from "./EditNewsForm";

const EditNewsPage = () => {
  // Data
  const [news, setNews] = useState();

  // Hooks
  const { newsId } = useParams();
  const { sendRequest } = useHttp();

  // Fetch news data by newsId
  useEffect(() => {
    const fetchNews = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/news-item/${newsId}`
      );
      setNews(responseData);
    };
    fetchNews();
  }, [newsId]);

  return (
    <section className="edit-project-section">
      <BTitle>Úprava aktuality</BTitle>
      {news && <EditNewsForm news={news} />}
    </section>
  );
};

export default EditNewsPage;
