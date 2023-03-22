import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useHttp } from "../../../../hooks/http-hook";
import { Roles } from "../../../../utils/roles";

import "./News.scss";
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
        setLoadedNews(responseData);
      } catch (err) {}
    };
    fetchNews();
  }, [props.projectId]);
  return (
    <section className="project-news-section">
      <h1 className="project-news-section__title">Aktuality:</h1>
      <div className="project-news--list">
        {loadedNews.map((news) => (
          <div className="project-news--item">
            <h1 className="project-news--item__title">
              {news.title}
            </h1>
            <p className="project-news--item__date">{news.date}</p>
            <p className="project-news--item__text">
             {news.text}
            </p>
          </div>
        ))}

        <div className="project-news--item">
          <h1 className="project-news--item__title">
            Jsme na začátku. Pomozte!
          </h1>
          <p className="project-news--item__date">22. 3. 2023</p>
          <p className="project-news--item__text">
            Snažíme se ffdfsdf fsd fs fds f s ff s fds mfksdo mfsio fmsido fsiod
            fidos
          </p>
        </div>
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
