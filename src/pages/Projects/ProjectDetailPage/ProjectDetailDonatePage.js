import React, { Fragment, useCallback, useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from '../../../contexts/AuthContext' 
import { useHttp } from "../../../hooks/http-hook";
import { Roles } from "../../../utils/roles";

import Donatables from "../components/Donatables";
import News from "../components/News/News";


import "./ProjectDetailDonatePage.scss";

const ProjectDetailDonatePage = (props) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false)
  const auth = useContext(AuthContext)
  const {sendRequest} =useHttp()
  const navigate = useNavigate()
  const deleteProjectHandler = async () => {
    try {
      const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/admin/project/delete/${props.project._id}`, 'PATCH', null, {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      })
      // if (responseData.msg === 'ok') {
        navigate('/')
      // }
    } catch (err) {
      
    }
  }

  return (
    <Fragment>
      {/* {auth.role === Roles.ADMIN && <section className="project-detail-admin-section admin-section">
        <NavLink to={'/upravit/projekt/' + props.project._id} className="btn-warning">Upravit</NavLink>
        <button className="btn-danger-outline btn-small">Odstranit</button>
      </section>} */}
      {auth.role === Roles.ADMIN && <div>
      <Link to={'/upravit/projekt/' + props.project._id} className="btn--secondary btn-small">Upravit</Link>
      {!showDeleteBtn && <button onClick={() => setShowDeleteBtn(true)} className="btn--secondary btn-small">Odstranit</button>}
      {showDeleteBtn&& <div>
        <button onClick={()=>setShowDeleteBtn(false)} className="btn--secondary btn-small">Zpět</button>
        <button onClick={deleteProjectHandler} className="btn-danger btn-small">Doopravdy odstanit</button>
      </div>}
    </div>}
      <section className="project-detail-info-section">
      <h1 className="project-detail-title">{props.project.title}</h1>
        <div className="project-detail-main-img--wrapper">
          <img
            className="project-detail-main-img"
            src={props.project.photo}
          />
        </div>
        <p className="project-detail-desc">{props.project.desc}</p>
      </section>
      <News urlTitle={props.project.urlTitle} projectId={props.project._id} />
      <Donatables project={props.project} />
      {/* <DonationOptions preparedPrices={props.project.preparedPrices} project={props.project} /> */}
    </Fragment>
  );
};

export default ProjectDetailDonatePage;
