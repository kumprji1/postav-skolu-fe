import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useHttp } from "../../../../hooks/http-hook";
import { Roles } from "../../../../utils/roles";

import "./News.scss";
import NewsItem from "./NewsItem";
const News = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading } = useHttp();
  const [loadedNews, setLoadedNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/news/${props.projectId}`
        );
        setLoadedNews(responseData.reverse());
      } catch (err) {}
    };
    fetchNews();
  }, [props.projectId]);

  const deleteNewsHandler = async (newsId) => {
    console.log('Delete: ', newsId)
    try {
      const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/admin/news/delete/${newsId}`, 'PATCH', null, {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      })
      // if (responseData.msg === 'ok') {
        setLoadedNews(loadedNews.filter(news => news._id !== newsId))
      // }
    } catch (err) {
      
    }
  }

  return (
    <section className="project-news-section">
      <h1 className="project-news-section__title">Aktuality:</h1>
      <div className="project-news--list">
        {loadedNews.map((news) => <NewsItem news={news} key={news._id} deleteNewsHandler={() => deleteNewsHandler(news._id)} /> )}
      </div>
      {auth.role == Roles.ADMIN && (
        <Link
          to={`/nova-aktualita/${props.urlTitle}`}
          className="btn--secondary project-news--addItem-btn"
        >
          Přidat Aktualitu
        </Link>
      )}
    </section>
  );
};

export default News;
