import React, { useContext, useState } from 'react'

import format from "date-format";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthContext';
import { Roles } from '../../../../utils/roles';

const NewsItem = ({news, deleteNewsHandler}) => {
  const auth = useContext(AuthContext)
    const [showDeleteBtn, setShowDeleteBtn] = useState(false)

  return (
    <div className="project-news--item">
    <h1 className="project-news--item__title">{news.title}</h1>
    <p className="project-news--item__date">
      {format.asString("dd.MM.yyyy", new Date(news.createdAt))}
    </p>
    <p className="project-news--item__text">{news.text}</p>
    {auth.role === Roles.ADMIN && <div>
      <Link to={`/upravit/aktualita/${news._id}`} className="btn--secondary btn-small">Upravit</Link>
      {!showDeleteBtn && <button onClick={() => setShowDeleteBtn(true)} className="btn--secondary btn-small">Odstranit</button>}
      {showDeleteBtn&& <div>
        <button onClick={()=>setShowDeleteBtn(false)} className="btn--secondary btn-small">Zpět</button>
        <button onClick={deleteNewsHandler} className="btn-danger btn-small">Doopravdy odstanit</button>
      </div>}
    </div>}
  </div>
  )
}

export default NewsItem